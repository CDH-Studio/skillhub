const axios = require("axios");
const {JiraUser} = require("utils/models");

const PLATFORM_SERVER = "server";
const PLATFORM_CLOUD = "cloud";

const jiraAuthToken = process.env.JIRA_AUTH_TOKEN;
const jiraHost = process.env.JIRA_HOST;
const jiraPlatform = process.env.JIRA_PLATFORM;

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

class JiraScraper {
    constructor({authToken = jiraAuthToken, host = jiraHost, platform = jiraPlatform} = {}) {
        if (platform !== PLATFORM_SERVER && platform !== PLATFORM_CLOUD) {
            throw Error("Invalid Jira platform configuration");
        }

        this.authToken = authToken;
        this.host = host;
        this.platform = platform;

        this.encodedAuthToken = Buffer.from(this.authToken).toString("base64");

        this.baseUrl = this.host + PLATFORM_CONFIGS[this.platform].basePath;
        this.authHeaders = {authorization: `Basic ${this.encodedAuthToken}`};
    }

    async getUsers() {
        // TODO: Account for when there are more than 1000 users
        const url = this.baseUrl + PLATFORM_CONFIGS[this.platform].getUsers;
        const result = await axios.get(url, {headers: this.authHeaders});

        return result.data.reduce((acc, user) => {
            if (!user.name.includes("addon_")) {
                acc.push(new JiraUser({name: user.name, email: user.emailAddress}));
            }

            return acc;
        }, []);
    }
}

module.exports = JiraScraper;
