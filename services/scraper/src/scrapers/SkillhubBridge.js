const axios = require("axios");
const {BACKEND_URL, SKILLHUB_API_KEY} = require("config");
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
        const projects = await this.jiraScraper.getProjects();
        const skillhubProjects = projects.map((project) => project.toSkillhubProject());
        const users = await this.jiraScraper.getUsers();

        await this.axios.post("/scraperBridge", {projects: skillhubProjects, users});

        for (const project of projects) {
            console.log("looping");
            const issues = await this.jiraScraper.getIssues([project]);
            const response = await this.axios.post("/scraperBridge", {issues});
            console.log(response.data, "looping end");
        }

        return {yahaha: "You found me!"};
    }

    async testIssues() {
        const result = await this.jiraScraper.getIssues();

        return result;
    }
}

module.exports = SkillhubBridge;
