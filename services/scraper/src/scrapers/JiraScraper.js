const axios = require("axios");
const {JIRA_AUTH_TOKEN, JIRA_HOST, JIRA_PLATFORM} = require("config");
const {JiraUser} = require("utils/models");

const PLATFORM_SERVER = "server";
const PLATFORM_CLOUD = "cloud";

const PLATFORM_CONFIGS = {
    [PLATFORM_CLOUD]: {
        basePath: "/rest/api/3",
        getUsers: "/user/search?query=%20&maxResults=1000"
    },
    [PLATFORM_SERVER]: {
        basePath: "/rest/api/2",
        getUsers: "/user/search?username=.&maxResults=1000"
    }
};

const getPath = (platform, key) => PLATFORM_CONFIGS[platform][key];

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

        this.baseUrl = this.host + PLATFORM_CONFIGS[this.platform].basePath;
        this.encodedAuthToken = Buffer.from(this.authToken).toString("base64");

        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {authorization: `Basic ${this.encodedAuthToken}`}
        });
    }

    async getUsers() {
        // TODO: Account for when there are more than 1000 users
        const path = getPath(this.platform, "getUsers");
        const result = await this.axios.get(path);

        return result.data.reduce((acc, user) => {
            if (!user.name.includes("addon_")) {
                acc.push(new JiraUser({name: user.displayName, email: user.emailAddress}));
            }

            return acc;
        }, []);
    }
}

module.exports = JiraScraper;
