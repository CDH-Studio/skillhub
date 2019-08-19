const {SkillhubBridge} = require("scrapers/");
const {logger: baseLogger} = require("utils/");

const logger = baseLogger.child({module: "gitScrapingWorker"});
const skillhubBridge = new SkillhubBridge();

const gitScrapingWorker = async (job) => {
    const {id} = job;
    const {url} = job.data;

    logger.info({message: `Starting git scraping for repo ${url}`, url, jobId: id});
    const result = await skillhubBridge.scrapeGitRepo(url);
    logger.info({message: `Finished git scraping for repo ${url}`, url, jobId: id});

    return result;
};

module.exports = gitScrapingWorker;
