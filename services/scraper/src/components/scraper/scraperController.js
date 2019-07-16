const express = require("express");
const {asyncMiddleware} = require("middleware/");
const {SkillhubBridge} = require("scrapers/");

const skillhubBridge = new SkillhubBridge();

const router = express.Router();

router.get("/", asyncMiddleware(async (req, res) => {
    // Remove timeout for long running operations
    req.setTimeout(0);

    const result = await skillhubBridge.scrapeToSkillhub();
    res.send({status: "success", result});
}));

module.exports = router;
