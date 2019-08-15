const axios = require("axios");
const uuidv4 = require("uuid/v4");
const {BACKEND_URL, SKILLHUB_API_KEY} = require("config");
const {jiraScrapingQueue} = require("workers/queues");
const {logger: baseLogger} = require("utils/");
const GitScraper = require("./GitScraper");
const JiraScraper = require("./JiraScraper");

const logger = baseLogger.child({module: "SkillhubBridge"});

/* Handles running all of the scrapers to get their data and acts as the bridge
 * to Skillhub by passing all of that scraped data to the backend.
 */
class SkillhubBridge {
    constructor() {
        logger.info({message: "Skillhub backend url", url: BACKEND_URL});

        this.axios = axios.create({
            baseURL: BACKEND_URL,
            headers: {"x-api-key": SKILLHUB_API_KEY},
            maxContentLength: 100000000
        });

        this.gitScraper = new GitScraper();
        this.jiraScraper = new JiraScraper();
    }

    async scrapeContributors() {
        logger.info("Starting scraping process");

        // Scrape projects and convert them to Skillhub format
        logger.info("Scraping projects");
        const projects = await this.jiraScraper.getProjects();
        const skillhubProjects = projects.map((project) => project.toSkillhubProject());

        // Scrape users and convert them to Skillhub format
        logger.info("Scraping users");
        const users = await this.jiraScraper.getUsers();
        const skillhubUsers = users.map((user) => user.toSkillhubUser());

        // Send the projects and users to the Skillhub backend first, so that they already exist
        // before the issues are sent over to generate the contributors.
        logger.info("Posting projects and users to Skillhub backend");
        const projectsAndUsersResponse = await this.postToSkillhub({projects: skillhubProjects, users: skillhubUsers});

        const projectsAndUsersResult = projectsAndUsersResponse.data.result;
        logger.info({message: "Projects and users result", result: projectsAndUsersResult});

        // Asynchronously scrape and send the issues to the Skillhub backend to populate the contributors.
        logger.info("Queueing the scraping and posting of issues");
        const contributorsResult = this._queueContributors(projects.slice(0, 15));
        logger.info({message: "Contributors result", result: contributorsResult});

        const result = {
            ...projectsAndUsersResult,
            contributors: contributorsResult
        };

        logger.info({message: "Scraping result", result});
        return result;
    }

    async scrapeSkills(org = "") {
        const urls = await this.gitScraper.getRepoUrls(org);

        const skillsStats = {
            author: [],
            oldestCommitDate: [],
            latestCommitDate: [],
            changeCount: [],
            commit: [],
            file: [],
            skill: [],
            repo: []
        };

        for (const url of urls) {
            const skillMapping = await this.gitScraper.generateSkillMapping(url);

            // Fill up an array equal in length to the number of commits
            // we get back from the file stats with the repo, so that it can be used
            // as a marker on the backend that these commits were associated with this repo.
            const numberOfCommits = skillMapping["commit"].length;
            const repoStat = new Array(numberOfCommits).fill(url);

            // Combine the new repo stats with the old ones to build one giant array
            Object.keys(skillMapping).forEach((statKey) => {
                skillsStats[statKey] = skillsStats[statKey].concat(skillMapping[statKey]);
            });

            // Combine the newly filled repo array into the existing one
            skillsStats["repo"] = skillsStats["repo"].concat(repoStat);
        }

        const skillsResponse = await this.postToSkillhub({skillsStats});

        return skillsResponse.data;
    }

    async postToSkillhub(data = {}) {
        return await this.axios.post("/scraperBridge", data);
    }

    async scrapeProjectIssues(project = {}) {
        const issues = await this.jiraScraper.getIssues(project);
        return await this.postToSkillhub({issues});
    }

    _queueContributors(projects = []) {
        const jobIds = projects.map((project) => {
            const jobId = uuidv4();
            jiraScrapingQueue.add({project}, {jobId});

            return jobId;
        });

        return jobIds;
    }
}

module.exports = SkillhubBridge;
