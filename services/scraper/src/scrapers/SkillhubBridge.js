const axios = require("axios");
const {BACKEND_URL, SKILLHUB_API_KEY} = require("config");
const {chainingPromisePool} = require("utils/");
const JiraScraper = require("./JiraScraper");

/* Handles running all of the scrapers to get their data and acts as the bridge
 * to Skillhub by passing all of that scraped data to the backend.
 */
class SkillhubBridge {
    constructor() {
        this.axios = axios.create({
            baseURL: BACKEND_URL,
            headers: {"x-api-key": SKILLHUB_API_KEY},
            maxContentLength: 100000000
        });

        this.jiraScraper = new JiraScraper();
    }

    async scrapeToSkillhub() {
        // Scrape projects and convert them to Skillhub format
        const projects = await this.jiraScraper.getProjects();
        const skillhubProjects = projects.map((project) => project.toSkillhubProject());

        // Scrape users and convert them to Skillhub format
        const users = await this.jiraScraper.getUsers();
        const skillhubUsers = users.map((user) => user.toSkillhubUser());

        // Send the projects and users to the Skillhub backend first, so that they already exist
        // before the issues are sent over to generate the contributors.
        const projectsAndUsersResponse = await this.axios.post(
            "/scraperBridge", {projects: skillhubProjects, users: skillhubUsers}
        );

        const projectsAndUsersResult = projectsAndUsersResponse.data.result;

        // Concurrently scrape and send the issues to the Skillhub backend to populate the contributors.
        const contributorsResponse = await chainingPromisePool(
            projects, this._scrapeProjectIssues.bind(this)
        );

        const contributorsResult = contributorsResponse.reduce((acc, {data}) => {
            const {contributors} = data.result;
            return {...acc, ...contributors};
        }, {});

        return {
            ...projectsAndUsersResult,
            contributors: contributorsResult
        };
    }

    async _scrapeProjectIssues(project = "") {
        const issues = await this.jiraScraper.getIssues(project);
        return await this.axios.post("/scraperBridge", {issues});
    }
}

module.exports = SkillhubBridge;
