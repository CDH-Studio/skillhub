const {SkillhubBridge} = require("scrapers/");
const {logger: baseLogger} = require("utils/");

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

module.exports = jiraScrapingWorker;
