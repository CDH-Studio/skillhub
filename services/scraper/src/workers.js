const axios = require("axios");
const {BACKEND_URL, SKILLHUB_API_KEY} = require("config");
const GitScraper = require("scrapers/GitScraper");

const gitScraper = new GitScraper();

const customAxios = axios.create({
    baseURL: BACKEND_URL,
    headers: {"x-api-key": SKILLHUB_API_KEY},
    maxContentLength: 100000000
});

const gitWorker = async (job) => {
    const {url} = job.data;

    const skillsStats = await gitScraper.generateSkillMapping(url);
    await customAxios.post("/scraperBridge", {skillsStats});
};

module.exports = {
    gitWorker
};
