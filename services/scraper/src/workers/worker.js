if (process.env.NODE_ENV !== "production") {
    // In theory, the only time a .env file is present is on a developer's machine
    // As such, development is the only time that loading the dotenv should be required
    require("dotenv").config();
}

/* This file is treated as a script (hence the above dotenv config).
 * It is used to start a worker instance in a separate container.
 * This worker instance handles processing jobs for the Jira and Git scraping processes.
 */

const jiraScrapingWorker = require("./jiraScrapingWorker");
const {jiraScrapingQueue} = require("./queues");

// Run 2 concurrent copies of the jira scraping process
// 2 seems like a good number.
//
// Technically, we could just spin up more containers of the worker instance,
// instead of making each instance run concurrent processes, but it's a more
// efficient use of resources to mix-and-match concurrent processes
// with multiple container instances.
jiraScrapingQueue.process(2, jiraScrapingWorker);
