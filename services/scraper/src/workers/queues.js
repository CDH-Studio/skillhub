const Queue = require("bull");
const {REDIS_CONFIG} = require("config");

const jiraScrapingQueue = new Queue("jiraScraping", REDIS_CONFIG);

module.exports = {
    jiraScrapingQueue
};
