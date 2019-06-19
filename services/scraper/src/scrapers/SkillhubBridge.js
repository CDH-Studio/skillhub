const axios = require("axios");
const {BACKEND_URL, SKILLHUB_API_KEY} = require("config");
const JiraScraper = require("./JiraScraper");

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
}

module.exports = SkillhubBridge;
