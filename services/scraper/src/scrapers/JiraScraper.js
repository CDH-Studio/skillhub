const axios = require("axios");
const {JIRA_AUTH_TOKEN, JIRA_HOST, JIRA_PLATFORM} = require("config");
const {chainingPromisePool} = require("utils/");
const {JiraProject, JiraUser} = require("utils/models");

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
        getUsers: `/user/search?query=%20&maxResults=${MAX_RESULTS_USER}`,
    },
    [PLATFORM_SERVER]: {
        basePath: "/rest/api/2",
        getIssues: `/search?fields=${ISSUE_FIELDS}&expand=changelog`,
        getIssuesCount: "/search?maxResults=0",
        getProjects: "/project",
        getProjectsLastUpdated: "/search?maxResults=1&fields=updated",
        getUsers: `/user/search?username=.&maxResults=${MAX_RESULTS_USER}`,
    }
};

const getPath = (platform, key) => PLATFORM_CONFIGS[platform][key];

/* Scraper for Jira that primarily handles scraping users, projects, and issues. */
class JiraScraper {
    constructor({authToken = JIRA_AUTH_TOKEN, host = JIRA_HOST, platform = JIRA_PLATFORM} = {}) {
        if (platform !== PLATFORM_SERVER && platform !== PLATFORM_CLOUD) {
            throw Error("Invalid Jira platform configuration");
        }

        if (!authToken) {
            throw Error("Missing Jira auth token");
        }

        this.authToken = authToken;
        this.host = host;
        this.platform = platform;

        this.baseUrl = this.host + getPath(this.platform, "basePath");

        // Jira expects the authentication credentials to be base64 encoded
        this.encodedAuthToken = Buffer.from(this.authToken).toString("base64");

        // Setup an axios instance that's prepopulated with some options
        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {authorization: `Basic ${this.encodedAuthToken}`}
        });
    }

    /* Handles fetching all of the user names/email addresses. */
    async getUsers() {
        const path = getPath(this.platform, "getUsers");

        let result = null;
        let users = [];
        let index = 0;

        // Loop until all the users have been scraped; this only matters
        // if there exists more than 1000 (MAX_RESULTS_USER) users on the Jira instance.
        do {
            const pathWithIndex = `${path}&startAt=${index}`;
            result = await this.axios.get(pathWithIndex);

            users = result.data.reduce((acc, user) => {
                if (!user.key.includes("addon_")) {
                    // Convert the user data to a format that Skillhub will understand, so that
                    // Skillhub can ingest the data more easily
                    acc.push(new JiraUser(user));
                }

                return acc;
            }, users);

            index += result.data.length;
        } while (result.data.length !== 0);

        return users;
    }

    /* Handles fetching all of the project names, Jira keys, and last active dates. */
    async getProjects() {
        const path = getPath(this.platform, "getProjects");

        // Fetch up all of the projects and convert them to JiraProject objects
        const result = await this.axios.get(path);
        const projects = result.data.map(({key, name}) => new JiraProject({key, name}));

        // Fetch up the most recently updated issue for each project and use 'updated' timestamp
        // as the 'lastActive' period for the project.
        const lastUpdatedDates = await chainingPromisePool(projects, this._fetchProjectLastUpdated.bind(this));
        projects.forEach((project, i) => project.updated = lastUpdatedDates[i]);

        return projects;
    }

    /* Handles fetching all of the issues for a given project along with their
     * associated comments, worklogs, and changelogs. */
    async getIssues(project = {}) {
        const {key: projectKey} = project;

        // Need to partially apply `this._fetchIssues` because `chainingPromisePool` only
        // takes async operations that accept a single argument.
        const partiallyAppliedGetIssues = async (index) => await this._fetchIssues(
            projectKey, index, MAX_RESULTS_ISSUES
        );

        // Need to get the total number of issues for the project so that we can figure
        // out how many chunks of `MAX_RESULTS_ISSUES` we need to fetch all of the issues
        const issuesCount = await this._fetchIssuesCount(projectKey);
        const indexChunkCount = Math.ceil(issuesCount / MAX_RESULTS_ISSUES);

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

        console.log(projectKey);
        console.log(issues.length);

        return issues;
    }

    /* Fetches up the 'updated' field of the last updated issue for a given project.
     * We use this as an indicator for when the project was 'last active'. */
    async _fetchProjectLastUpdated(project = {}) {
        const {key: projectKey} = project;

        const path = getPath(this.platform, "getProjectsLastUpdated");
        const fullPath = `${path}&jql=project=${projectKey}+order+by+updated+desc`;

        const response = await this.axios.get(path);
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
