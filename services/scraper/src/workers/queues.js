const Queue = require("bull");
const {REDIS_CONFIG} = require("config");

const gitScrapingQueue = new Queue("gitScraping", REDIS_CONFIG);
const jiraScrapingQueue = new Queue("jiraScraping", REDIS_CONFIG);

module.exports = {
    gitScrapingQueue,
    jiraScrapingQueue
};
