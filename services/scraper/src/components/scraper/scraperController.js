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

router.get("/skills", asyncMiddleware(async (req, res) => {
    req.setTimeout(0);
    
    const org = req.query.org || "";

    if (!org) {
        res.status(400).send({status: "error", message: "Must provide an organization as a query param."});
        return;
    }

    await skillhubBridge.testSkills(org);
    res.send({status: "success"});
}));

module.exports = router;
