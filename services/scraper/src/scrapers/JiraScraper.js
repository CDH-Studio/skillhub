const axios = require("axios");
const {JIRA_AUTH_TOKEN, JIRA_HOST, JIRA_PLATFORM, PROXY_HOST, PROXY_PORT} = require("config");
const {chainingPromisePool, logger: baseLogger} = require("utils/");
const {JiraProject, JiraUser} = require("utils/models");

const logger = baseLogger.child({module: "JiraScraper"});

const PLATFORM_SERVER = "server";
const PLATFORM_CLOUD = "cloud";

// 250 was the maximum we could scrape at once when doing all fields through manual IE 11 downloads.
// It can probably be upped now, but it's been performing well, so we're leaving it as is.
const MAX_RESULTS_ISSUES = 250;

// 1000 is the actual (Jira enforced) maximum for # of users for a single call; seems to work well.
const MAX_RESULTS_USER = 1000;

// The list of fields to grab when fetching issues; these are explicit to cut down on fetch time.
const ISSUE_FIELDS = [
    "issuetype", "project", "created", "priority", "assignee", "updated",
    "status", "creator", "reporter", "comment", "worklog"
].join(",");

const PLATFORM_CONFIGS = {
    [PLATFORM_CLOUD]: {
        basePath: "/rest/api/3",
        getIssues: `/search?fields=${ISSUE_FIELDS}&expand=changelog`,
        getIssuesCount: "/search?maxResults=0",
        getProjects: "/project",
        getProjectsLastUpdated: "/search?maxResults=1&fields=updated",
        getUsers: (query = "%20") => `/user/search?query=${query}&maxResults=${MAX_RESULTS_USER}`,
    },
    [PLATFORM_SERVER]: {
        basePath: "/rest/api/2",
        getIssues: `/search?fields=${ISSUE_FIELDS}&expand=changelog`,
        getIssuesCount: "/search?maxResults=0",
        getProjects: "/project",
        getProjectsLastUpdated: "/search?maxResults=1&fields=updated",
        getUsers: (query = ".") => `/user/search?username=${query}&maxResults=${MAX_RESULTS_USER}`,
    }
};

const getPath = (platform, key) => PLATFORM_CONFIGS[platform][key];

/* Scraper for Jira that primarily handles scraping users, projects, and issues. */
class JiraScraper {
    constructor({
        authToken = JIRA_AUTH_TOKEN,
        host = JIRA_HOST,
        platform = JIRA_PLATFORM,
        proxyHost = PROXY_HOST,
        proxyPort = PROXY_PORT
    } = {}) {
        if (platform !== PLATFORM_SERVER && platform !== PLATFORM_CLOUD) {
            throw Error("Invalid Jira platform configuration");
        }

        if (!authToken) {
            throw Error("Missing Jira auth token");
        }

        this.authToken = authToken;
        this.host = host;
        this.platform = platform;

        logger.info({message: "Jira Scraper configuration", host: this.host, platform: this.platform});

        this.baseUrl = this.host + getPath(this.platform, "basePath");

        // Jira expects the authentication credentials to be base64 encoded
        this.encodedAuthToken = Buffer.from(this.authToken).toString("base64");

        const axiosConfig = {
            baseURL: this.baseUrl,
            headers: {authorization: `Basic ${this.encodedAuthToken}`}
        };

        if (PROXY_HOST && PROXY_PORT) {
            axiosConfig.proxy = {
                host: proxyHost,
                port: proxyPort
            };
        }

        // Setup an axios instance that's prepopulated with some options
        this.axios = axios.create(axiosConfig);
    }

    /* Handles fetching all of the user names/email addresses. */
    async getUsers() {
        logger.info({message: "Starting users scraping"});

        let result = null;
        let users = [];
        const addedUsersIndex = {};

        for (let i = 0; i < 26; i++) {
            logger.info({message: "Looping through users", index: i});

            // Perform searches for each letter of the alphabet
            // Have to do this because even though the API has a pagination option with `startAt`,
            // it doesn't actually let us get any more than the first 1000 users.
            // So doing a wildcard search can't get any more than 1000 users for internal/server Jira.
            // As such, we try to break it down into doing searches by alphabet to _hopefully_ get everything.
            // This still has the limitation of not being able to get more than 1000 users per letter.
            const path = getPath(this.platform, "getUsers")(String.fromCharCode(97 + i));
            result = await this.axios.get(path);

            users = result.data.reduce((acc, user) => {
                const username = user.key;

                if (!username.includes("addon_") && !(username in addedUsersIndex)) {
                    // Convert the user data to a format that Skillhub will understand, so that
                    // Skillhub can ingest the data more easily
                    acc.push(new JiraUser(user));

                    addedUsersIndex[username] = true;
                }

                return acc;
            }, users);

            logger.info({message: "Scraped users", usersCount: users.length});
        }

        logger.info({message: "Finished users scraping", usersCount: users.lengths});
        return users;
    }

    /* Handles fetching all of the project names, Jira keys, and last active dates. */
    async getProjects() {
        const path = getPath(this.platform, "getProjects");
        logger.info({message: "Starting projects scraping", path});

        // Fetch up all of the projects and convert them to JiraProject objects
        const result = await this.axios.get(path);
        const projects = result.data.map(({key, name}) => new JiraProject({key, name}));

        logger.info({message: "Scraped projects", projectsCount: projects.length});

        // Fetch up the most recently updated issue for each project and use 'updated' timestamp
        // as the 'lastActive' period for the project.
        logger.info("Getting last updated times for projects");
        const lastUpdatedDates = await chainingPromisePool(projects, this._fetchProjectLastUpdated.bind(this));
        projects.forEach((project, i) => project.updated = lastUpdatedDates[i]);

        logger.info("Finished projects scraping");
        return projects;
    }

    /* Handles fetching all of the issues for a given project along with their
     * associated comments, worklogs, and changelogs. */
    async getIssues(project = {}) {
        const {key: projectKey} = project;

        // Associate each of these log statements with the project key, since
        // this function gets run multiple times in parallel.
        const issuesLogger = logger.child({projectKey});
        issuesLogger.info("Starting issues scraping");

        // Need to partially apply `this._fetchIssues` because `chainingPromisePool` only
        // takes async operations that accept a single argument.
        const partiallyAppliedGetIssues = async (index) => await this._fetchIssues(
            projectKey, index, MAX_RESULTS_ISSUES
        );

        // Need to get the total number of issues for the project so that we can figure
        // out how many chunks of `MAX_RESULTS_ISSUES` we need to fetch all of the issues
        const issuesCount = await this._fetchIssuesCount(projectKey);
        const indexChunkCount = Math.ceil(issuesCount / MAX_RESULTS_ISSUES);

        issuesLogger.info({message: `Will scrape ${issuesCount} issues`, issuesCount});

        // Fill an array with increments of `MAX_RESULTS_ISSUES` from 0 to `issuesCount`
        const indexes = (
            new Array(indexChunkCount)
                .fill(MAX_RESULTS_ISSUES)
                .map((value, i) => value * i)
        );

        // Fetch the list of issues for each index chunk and...
        const listsOfIssues = await chainingPromisePool(
            indexes, partiallyAppliedGetIssues, {concurrencyLimit: 3}
        );

        // ...flatten the lists of issues into a single list of all the issues
        const issues = [].concat(...listsOfIssues);
        issuesLogger.info({message: "Scraped issues", issuesCount: issues.length});

        return issues;
    }

    /* Fetches up the 'updated' field of the last updated issue for a given project.
     * We use this as an indicator for when the project was 'last active'. */
    async _fetchProjectLastUpdated(project = {}) {
        const {key: projectKey} = project;

        const path = getPath(this.platform, "getProjectsLastUpdated");
        const fullPath = `${path}&jql=project=${projectKey}+order+by+updated+desc`;

        const response = await this.axios.get(fullPath);
        const issues = response.data.issues;

        if (issues.length) {
            return new Date(issues[0].fields.updated);
        } else {
            // If the project has no issues, just assign it some totally arbitrary old date.
            return new Date("1970-01-01");
        }
    }

    /* Fetches up the total number of issues for a given project. */
    async _fetchIssuesCount(projectKey = "") {
        const path = getPath(this.platform, "getIssuesCount");
        const fullPath = `${path}&jql=project=${projectKey}`;

        const response = await this.axios.get(fullPath);
        return response.data.total;
    }

    /* Fetches up a chunk of the issues for a given project.
     *
     * @param projectKey    The Jira key for the project.
     * @param index         The 'startAt' point to grab issues from.
     * @param maxResults    The max number of issues to fetch at once.
     *
     * @return The chunk of issues starting at `index` and ending at `maxResults`.
     */
    async _fetchIssues(projectKey = "", index, maxResults) {
        const path = getPath(this.platform, "getIssues");
        const fullPath = `${path}&jql=project=${projectKey}&maxResults=${maxResults}&startAt=${index}`;

        const response = await this.axios.get(fullPath);
        return response.data.issues;
    }
}

module.exports = JiraScraper;
