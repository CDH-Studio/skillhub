const Queue = require("bull");
const {REDIS_CONFIG} = require("config");

const gitScrapingQueue = new Queue("gitScraping", REDIS_CONFIG);

module.exports = {
    gitScrapingQueue
};
