const axios = require("axios");
const {JIRA_AUTH_TOKEN, JIRA_HOST, JIRA_PLATFORM} = require("config");
const {JiraUser} = require("utils/models");

const PLATFORM_SERVER = "server";
const PLATFORM_CLOUD = "cloud";

const MAX_RESULTS_ISSUES = 250;
const MAX_RESULTS_USER = 1000;

const PLATFORM_CONFIGS = {
    [PLATFORM_CLOUD]: {
        basePath: "/rest/api/3",
        getIssues: `/search?fields=*all&expand=changelog&maxResults=${MAX_RESULTS_ISSUES}`,
        getProjects: "/project",
        getUsers: `/user/search?query=%20&maxResults=${MAX_RESULTS_USER}`,
    },
    [PLATFORM_SERVER]: {
        basePath: "/rest/api/2",
        getIssues: `/search?fields=*all&expand=changelog&maxResults=${MAX_RESULTS_ISSUES}`,
        getProjects: "/project",
        getUsers: `/user/search?username=.&maxResults=${MAX_RESULTS_USER}`,
    }
};

const getPath = (platform, key) => PLATFORM_CONFIGS[platform][key];

/* Scraper for Jira that primarily handles scraping users and projects. */
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
        this.encodedAuthToken = Buffer.from(this.authToken).toString("base64");

        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {authorization: `Basic ${this.encodedAuthToken}`}
        });
    }

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
                    acc.push(new JiraUser(user).toSkillhubUser());
                }

                return acc;
            }, users);

            index += result.data.length;
        } while (result.data.length !== 0);

        return users;
    }

    async getProjects() {
        const path = getPath(this.platform, "getProjects");

        const result = await this.axios.get(path);
        const projects = result.data.map(({key, name}) => ({key, name}));

        return projects;
    }

    async getIssues(projects = []) {
        const path = getPath(this.platform, "getIssues");

        let issues = [];

        for (const project of projects) {
            const {key} = project;
            console.log(key);

            let result = null;
            let index = 0;

            // Loop until all the users have been scraped; this only matters if there
            // exists more than 250 (MAX_RESULTS_ISSUES) issues for the given project.
            do {
                const pathWithIndex = `${path}&startAt=${index}&jql=project=${key}`;

                result = await this.axios.get(pathWithIndex);
                issues = issues.concat(result.data.issues);

                index += result.data.issues.length;
            } while (result.data.issues.length !== 0);
        }

        return issues;
    }
}

module.exports = JiraScraper;
