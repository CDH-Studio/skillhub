const express = require("express");
const {asyncMiddleware} = require("middleware/");
const {SkillhubBridge} = require("scrapers/");
const {gitScrapingQueue, jiraScrapingQueue} = require("workers/queues");

const skillhubBridge = new SkillhubBridge();

const router = express.Router();

const getJobs = (queue) => async (req, res) => {
    const {ids: rawIds} = req.query;
    const ids = rawIds.split(",");

    const jobs = [];

    for (const id of ids) {
        const job = await queue.getJob(id);
        jobs.push(job);
    }

    res.send({status: "success", jobs});
};

router.get("/contributors", asyncMiddleware(async (req, res) => {
    // Remove timeout since this is a (potentially) long running operation
    req.setTimeout(0);

    const result = await skillhubBridge.scrapeContributors();
    res.send({status: "success", result});
}));

router.get("/skills", asyncMiddleware(async (req, res) => {
    req.setTimeout(0);

    const {org} = req.query;

    try {
        const result = await skillhubBridge.scrapeSkills(org);
        res.send({status: "success", result});
    } catch (e) {
        const status = (e.message === "Must provide an organization as a query param.") ? 400 : 500;
        res.status(status).send({status: "error", message: e.message});
    }
}));

router.get("/contributors/jobs", asyncMiddleware(getJobs(jiraScrapingQueue)));
router.get("/skills/jobs", asyncMiddleware(getJobs(gitScrapingQueue)));

module.exports = router;
