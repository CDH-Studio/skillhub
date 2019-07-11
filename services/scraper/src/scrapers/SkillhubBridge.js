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
            headers: {"x-api-key": SKILLHUB_API_KEY}
        });

        this.jiraScraper = new JiraScraper();
    }

    async scrapeToSkillhub() {
        const users = await this.jiraScraper.getUsers();
        const result = await this.axios.post("/scraperBridge", {users});

        return result.data;
    }

    async testIssues() {
        const result = await this.jiraScraper.getIssues();

        return result;
    }
}

module.exports = SkillhubBridge;
