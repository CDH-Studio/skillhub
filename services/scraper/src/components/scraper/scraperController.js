const express = require("express");
const {asyncMiddleware} = require("middleware/");
const {gitScrapingQueue} = require("queues");
const {SkillhubBridge} = require("scrapers/");

const skillhubBridge = new SkillhubBridge();

const router = express.Router();

router.get("/", asyncMiddleware(async (req, res) => {
    // Remove timeout since this is a (potentially) long running operation
    req.setTimeout(0);

    const result = await skillhubBridge.scrapeToSkillhub();
    res.send({status: "success", result});
}));

// TODO (CDHSH-112): Move this into the main scraper route
router.get("/skills", asyncMiddleware(async (req, res) => {
    req.setTimeout(0);

    const {org} = req.query;

    if (!org) {
        res.status(400).send({status: "error", message: "Must provide an organization as a query param."});
        return;
    }

    const result = await skillhubBridge.testSkills(org);
    res.send({status: "success", result});
}));

router.get("/skills/jobs", asyncMiddleware(async (req, res) => {
    const {ids: rawIds} = req.query;
    const ids = rawIds.split(",");

    const jobs = [];

    for (const id of ids) {
        const job = await gitScrapingQueue.getJob(id);
        jobs.push(job);
    }

    res.send({status: "success", jobs});
}));

module.exports = router;
