const express = require("express");
const {asyncMiddleware} = require("middleware/");
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

router.get("/test", asyncMiddleware(async (req, res) => {
    res.send({status: "success", message: "Test route working."});
}));

module.exports = router;
