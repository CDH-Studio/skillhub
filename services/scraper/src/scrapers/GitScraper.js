const axios = require("axios");
const {spawn} = require("child_process");
const fs = require("fs");
const {GIT_AUTH_TOKEN, GIT_HOST, GIT_PLATFORM} = require("config");
const {chainingPromisePool, logger: baseLogger, loggerUtils} = require("utils/");

const logger = baseLogger.child({module: "GitScraper"});
const logExecutionTime = loggerUtils.logExecutionTime(logger);

const REPO_STORAGE_PATH = "/tmp/repo";

const PLATFORM_BITBUCKET = "bitbucket";
const PLATFORM_GITHUB = "github";

const PLATFORM_CONFIGS = {
    [PLATFORM_BITBUCKET]: {
        basePath: "/rest/api/1.0",
        getOrgRepos: () => "",  // TODO once we get Bitbucket access
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
        return await logExecutionTime("getRepoUrls", {organization}, async () => {
            const path = getPath(this.platform, "getOrgRepos")(organization);

            const result = await this.axios.get(path);
            const cloneUrls = result.data.map(({clone_url: cloneUrl}) => cloneUrl);

            return cloneUrls;
        });
    }

    async generateSkillMapping(repoUrl = "") {
        return await logExecutionTime("generateSkillMapping", {repoUrl}, async () => {
            try {
                await this._cloneRepo(repoUrl);
                const skillFileBreakdown = await this._getSkillFileBreakdown(REPO_STORAGE_PATH, repoUrl);
                const rawStats = await this._generateRawStats(skillFileBreakdown, repoUrl);

                return rawStats;
            } catch (err) {
                logger.error(err);
                throw new Error(err);
            }
        });
    }

    async _cloneRepo(repoUrl = "") {
        await logExecutionTime("_cloneRepo", {repoUrl}, async () => {
            deleteFolderRecursive(REPO_STORAGE_PATH);
            await promisifiedSpawn("git", ["clone", repoUrl, REPO_STORAGE_PATH]);
        });
    }

    async _getSkillFileBreakdown(repoPath = "", repoUrl = "") {
        return await logExecutionTime("_getSkillFileBreakdown", {repoPath, repoUrl}, async () => {
            const output = await promisifiedSpawn("ruby", ["./scripts/skill_file_breakdown.rb", repoPath]);
            const skillFileBreakdown = JSON.parse(output);

            return skillFileBreakdown;
        });
    }

    async _generateRawStats(skillFileBreakdown = {}, repoUrl = "") {
        return await logExecutionTime("_generateRawStats", {repoUrl}, async () => {
            const rawStats = {};
            const skills = Object.keys(skillFileBreakdown);

            for (const skill of skills) {
                const files = skillFileBreakdown[skill];

                for (const file of files) {
                    if (!(skill in rawStats)) {
                        rawStats[skill] = {};
                    }

                    rawStats[skill][file] = await this._getFileStats(file);
                }
            }

            return rawStats;
        });
    }

    async _getFileStats(file = "") {
        const rawFileLog = await promisifiedSpawn(
            "git",
            [
                `--git-dir=${REPO_STORAGE_PATH}/.git`, "log", "--pretty='%aE%n%aD'", "--numstat", "--no-merges",
                "--", file
            ]
        );

        const fileLog = rawFileLog.split("\n").map((line) => line.replace("'", "")).filter((line) => line);

        const stats = {
            authors: [],
            oldestCommitDates: [],
            latestCommitDates: [],
            changeCounts: [],
            commitCounts: []
        };

        let index = 0;

        while (index < (fileLog.length - 2)) {
            const author = fileLog[index];
            const date = fileLog[index + 1];
            const changes = fileLog[index + 2];

            const dateEpoch = new Date(date).getTime();  // Get epoch in milliseconds

            stats.authors.push(author);
            stats.oldestCommitDates.push(dateEpoch);
            stats.latestCommitDates.push(dateEpoch);
            stats.changeCounts.push(this._calculateTotalCommitChanges(changes));
            stats.commitCounts.push(1);

            index += 3;
        }

        return stats;
    }

    /* Calculates the total number of changes that were made to a particular file by adding
     * the number of additions and deletions that were made.
     *
     * @param outputLine    The line from the commit log with the changes. e.g. "10\t5\tfilename"
     * @return The sum of the addition and deletion changes.
     */
    _calculateTotalCommitChanges(outputLine = "") {
        const splitLine = outputLine.split("\t");
        return parseInt(splitLine[0]) + parseInt(splitLine[1]);
    }
}

const promisifiedSpawn = (command = "", args = []) => (
    new Promise((resolve, reject) => {
        const child = spawn(command, args);

        let output = "";
        let errorOutput = "";

        child.stdout.on("data", (data) => {
            output += data.toString();
        });

        child.stderr.on("data", (data) => {
            errorOutput += data.toString();
        });

        child.on("exit", (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(errorOutput);
            }
        });

        child.on("error", (err) => {
            reject(err);
        });
    })
);

// Taken from https://geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
const deleteFolderRecursive = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            const currentPath = path + "/" + file;

            if (fs.lstatSync(currentPath).isDirectory()) {
                deleteFolderRecursive(currentPath);
            } else {
                fs.unlinkSync(currentPath);
            }
        });

        fs.rmdirSync(path);
    }
};

module.exports = GitScraper;
