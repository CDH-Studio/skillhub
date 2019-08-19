const axios = require("axios");
const {spawn} = require("child_process");
const fs = require("fs");
const uuidv4 = require("uuid/v4");
const {GIT_AUTH_TOKEN, GIT_HOST, GIT_PLATFORM} = require("config");
const {chainingPromisePool, logger: baseLogger, loggerUtils} = require("utils/");

const logger = baseLogger.child({module: "GitScraper"});
const logExecutionTime = loggerUtils.logExecutionTime(logger);

const REPO_STORAGE_FOLDER = "/tmp";

const PLATFORM_BITBUCKET = "bitbucket";
const PLATFORM_GITHUB = "github";

const PLATFORM_CONFIGS = {
    [PLATFORM_BITBUCKET]: {
        basePath: "/rest/api/1.0",
        getProjects: () => "/projects?limit=1000",
        getProjectRepos: (project) => `/projects/${project}/repos?limit=1000`
    },
    [PLATFORM_GITHUB]: {
        basePath: "",  // Yes, this should be empty. Github puts the 'api' portion as a subdomain.
        getOrgRepos: (org) => `/orgs/${org}/repos`
    }
};

const getPath = (platform, key) => PLATFORM_CONFIGS[platform][key];

/* Scraper for the various git hosting platforms (i.e. Bitbucket and Github) that handles cloning
 * and scraping various stats from repos that can then be used to make skill predictions. */
class GitScraper {
    constructor({authToken = GIT_AUTH_TOKEN, host = GIT_HOST, platform = GIT_PLATFORM} = {}) {
        if (platform !== PLATFORM_BITBUCKET && platform !== PLATFORM_GITHUB) {
            throw Error("Invalid Git platform configuration");
        }

        if (!authToken && platform === PLATFORM_BITBUCKET) {
            throw Error("Missing Git platform auth token");
        }

        if (platform === PLATFORM_BITBUCKET) {
            // Use this without await since we can't have async constructors;
            // just assume that it works. Very safe.
            this._enableGitSsh();
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

    /* Grabs a list of clone urls for all the repos of the given Bitbucket/Github organization.
     *
     * @param organization  The Bitbucket/Github organization to pull from.
     * @return The list of clone urls.
     */
    async getRepoUrls(organization = "") {
        return await logExecutionTime("getRepoUrls", {organization}, async () => {
            const path = getPath(this.platform, "getOrgRepos")(organization);

            const result = await this.axios.get(path);
            const cloneUrls = result.data.map(({clone_url: cloneUrl}) => cloneUrl);

            return cloneUrls;
        });
    }

    /* Clones the given repo and generates a raw skill mapping for it. This raw skill mapping can then be used
     * by the 'predictions' service to generate skill predictions.
     *
     * @param repoUrl   The url to clone the repo from.
     * @return A raw skill mapping, that looks like this:
     *
     *  ```
     *  {
     *      [skill]: {
     *          [file]: {
     *              authors: [...],
     *              oldestCommitDates: [...],
     *              latestCommitDates: [...],
     *              changeCounts: [...],
     *              commitCounts: [...]
     *          }
     *      }
     *  }
     *  ```
     *
     *  The `skill`s and `file`s are determined by the repo's github-linguist breakdown.
     */
    async generateSkillMapping(repoUrl = "") {
        const repoPath = REPO_STORAGE_FOLDER + "/" + uuidv4();

        return await logExecutionTime("generateSkillMapping", {repoUrl}, async () => {
            try {
                await this._cloneRepo(repoUrl, repoPath);
                const skillFileBreakdown = await this._getSkillFileBreakdown(repoUrl, repoPath);
                const rawStats = await this._generateRawStats(skillFileBreakdown, repoUrl, repoPath);

                deleteFolderRecursive(repoPath);

                return rawStats;
            } catch (err) {
                logger.error(err);
                throw new Error(err);
            }
        });
    }

    async _enableGitSsh() {
        await promisifiedSpawn("git", [
            "config", "--global", "core.sshCommand",
            "'/usr/bin/ssh -i /ssh/bitbucket-ssh-key'"
        ]);
    }

    /* Clones a repo to a given file path. */
    async _cloneRepo(repoUrl = "", repoPath = "") {
        await logExecutionTime("_cloneRepo", {repoUrl}, async () => {
            deleteFolderRecursive(repoPath);
            await promisifiedSpawn("git", ["clone", repoUrl, repoPath]);
        });
    }

    /* Runs the github-linguist script to get a breakdown of skills -> files. */
    async _getSkillFileBreakdown(repoUrl = "", repoPath = "") {
        return await logExecutionTime("_getSkillFileBreakdown", {repoUrl, repoPath}, async () => {
            const output = await promisifiedSpawn("ruby", ["./scripts/skill_file_breakdown.rb", repoPath]);
            const skillFileBreakdown = JSON.parse(output);

            return skillFileBreakdown;
        });
    }

    /* Generates the set of raw stats for each combination of skill/file. */
    async _generateRawStats(skillFileBreakdown = {}, repoUrl = "", repoPath = "") {
        const skills = Object.keys(skillFileBreakdown);

        return await logExecutionTime("_generateRawStats", {skills, repoUrl}, async () => {
            const rawStats = {
                author: [],
                oldestCommitDate: [],
                latestCommitDate: [],
                changeCount: [],
                commit: [],
                file: [],
                skill: []
            };

            for (const skill of skills) {
                const files = skillFileBreakdown[skill];

                for (const file of files) {
                    const fileStats = await this._getFileStats(file, repoPath);

                    // Fill up an array equal in length to the number of commits
                    // we get back from the file stats with the skill, so that it can be used
                    // as a marker on the backend that these commits were associated with this skill.
                    const numberOfCommits = fileStats["commit"].length;
                    const skillStat = new Array(numberOfCommits).fill(skill);

                    // Combine the new file stats with the old ones to build one giant array
                    Object.keys(fileStats).forEach((statKey) => {
                        rawStats[statKey] = rawStats[statKey].concat(fileStats[statKey]);
                    });

                    // Combine the newly filled skill array into the existing one
                    rawStats["skill"] = rawStats["skill"].concat(skillStat);
                }
            }

            return rawStats;
        });
    }

    /* Generates a set of raw stats for a single file. Raw stats encompass various information
     * parsed from the file's commit log, particularly the number of changes made by each author.
     */
    async _getFileStats(file = "", repoPath) {
        const rawFileLog = await promisifiedSpawn(
            "git",
            [
                `--git-dir=${repoPath}/.git`, "log", "--pretty='%H%n%aE%n%aD'", "--numstat", "--no-merges",
                "--", file
            ]
        );

        // Split the lines into an array, strip any outstanding quotes, and remove any empty lines.
        const fileLog = rawFileLog.split("\n").map((line) => line.replace("'", "")).filter((line) => line);

        // The reason we build a set of lists for all this data is so that it can be easily
        // imported into a DataFrame when it gets sent to the 'predictions' service.
        const stats = {
            author: [],
            oldestCommitDate: [],
            latestCommitDate: [],
            changeCount: [],
            commit: [],
            file: []
        };

        let index = 0;

        // Iterate in chunks of 4, where each chunk is one block of commit information.
        // The first line is the commit hash ('%H')
        // The second line is the author's email ('%aE').
        // The third line is the date the commit was made in RFC2822 style ('%aD').
        // The fourth line is the addition/deletion changes for the file in question ('--numstat').
        while (index < (fileLog.length - 3)) {
            const commitHash = fileLog[index];
            const author = fileLog[index + 1];
            const date = fileLog[index + 2];
            const changes = fileLog[index + 3];

            const dateEpoch = new Date(date).getTime();  // Get epoch in milliseconds

            stats.author.push(author);
            stats.oldestCommitDate.push(dateEpoch);
            stats.latestCommitDate.push(dateEpoch);
            stats.changeCount.push(this._calculateTotalCommitChanges(changes));
            stats.commit.push(commitHash);
            stats.file.push(file);

            index += 4;
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

/* A promisified version of `child_process.spawn`, so that we can use it with the same
 * async/await paradigms that the rest of the code uses.
 *
 * @param command   The base command to call.
 * @param args      A list of arguments to pass to the base command.
 * @return A promise that resolves to the output of the command called by spawn.
 */
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
// Deletes a folder if it exists, even if it is non-empty.
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
