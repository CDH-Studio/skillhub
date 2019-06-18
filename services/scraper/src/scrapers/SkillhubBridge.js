const JiraScraper = require("./JiraScraper");

class SkillhubBridge {
    constructor() {
        this.jiraScraper = new JiraScraper();
    }

    async scrapeToSkillhub() {
        const users = await this.jiraScraper.getUsers();
        console.log(users);
    }
}

module.exports = SkillhubBridge;
