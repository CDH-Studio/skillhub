if (process.env.NODE_ENV !== "production") {
    // In theory, the only time a .env file is present is on a developer's machine
    // As such, development is the only time that loading the dotenv should be required
    require("dotenv").config();
}

const jiraScrapingWorker = require("./jiraScrapingWorker");
const {jiraScrapingQueue} = require("./queues");

jiraScrapingQueue.process(2, jiraScrapingWorker);
