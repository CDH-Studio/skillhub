if (process.env.NODE_ENV !== "production") {
    // In theory, the only time a .env file is present is on a developer's machine
    // As such, development is the only time that loading the dotenv should be required
    require("dotenv").config();
}

const {SkillhubBridge} = require("scrapers/");
const {logger: baseLogger} = require("utils/");
const {jiraScrapingQueue} = require("workers/queues");

const logger = baseLogger.child({module: "jiraScrapingWorker"});
const skillhubBridge = new SkillhubBridge();

const jiraScrapingWorker = async (job) => {
    const {id} = job;
    const {project} = job.data;

    logger.info({message: `Starting jira scraping for project ${project.key}`, project, jobId: id});
    const result = await skillhubBridge.scrapeProjectIssues(project);
    logger.info({message: `Finished jira scraping for project ${project.key}`, project, jobId: id});

    return result;
};

jiraScrapingQueue.process(2, jiraScrapingWorker);
