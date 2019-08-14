const {gitScrapingQueue} = require("queues");
const {gitWorker} = require("workers");

gitScrapingQueue.process(2, gitWorker);
