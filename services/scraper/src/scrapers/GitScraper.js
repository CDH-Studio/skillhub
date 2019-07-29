const axios = require("axios");
const {GIT_AUTH_TOKEN, GIT_HOST, GIT_PLATFORM} = require("config");
const {chainingPromisePool, logger: baseLogger} = require("utils/");

const logger = baseLogger.child({module: "GitScraper"});

const PLATFORM_BITBUCKET = "bitbucket";
const PLATFORM_GITHUB = "github";

const PLATFORM_CONFIGS = {
    [PLATFORM_BITBUCKET]: {
        basePath: "/rest/api/1.0",
        getOrgRepos: (org) => "",  // TODO
    },
    [PLATFORM_GITHUB]: {
        basePath: "",  // Yes, this should be empty. Github puts the 'api' portion as a subdomain.
        getOrgRepos: (org) => `/orgs/${org}/repos`
    }
};

const getPath = (platform, key) => PLATFORM_CONFIGS[platform][key];

class GitScraper {
    constructor({authToken = GIT_AUTH_TOKEN, host = GIT_HOST, platform = GIT_PLATFORM} = {}) {
        if (platform !== PLATFORM_BITBUCKET && platform !== PLATFORM_GITHUB) {
            throw Error("Invalid Git platform configuration");
        }

        if (!authToken && platform === PLATFORM_BITBUCKET) {
            throw Error("Missing Git auth token");
        }

        this.authToken = authToken || "";
        this.host = host;
        this.platform = platform;

        logger.info({message: "Git Scraper configuration", host: this.host, platform: this.platform});

        this.baseUrl = this.host + getPath(this.platform, "basePath");

        // Bitbucket expects the authentication credentials to be base64 encoded
        this.encodedAuthToken = Buffer.from(this.authToken).toString("base64");

        // Setup an axios instance that's prepopulated with some options
        const headers = (this.platform === PLATFORM_BITBUCKET) ? {authorization: `Basic ${this.encodedAuthToken}`} : {};
        this.axios = axios.create({baseURL: this.baseUrl, headers});
    }

    async getRepoUrls(organization = "") {
        const path = getPath(this.platform, "getOrgRepos")(organization);

        const result = await this.axios.get(path);

        const cloneUrls = result.data.map(({clone_url: cloneUrl}) => cloneUrl);
        console.log(cloneUrls);
        return cloneUrls;
    }
}

module.exports = GitScraper;
