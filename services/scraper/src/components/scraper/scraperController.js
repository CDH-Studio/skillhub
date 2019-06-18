const express = require("express");
const {asyncMiddleware} = require("middleware/");
const {SkillhubBridge} = require("scrapers/");

const skillhubBridge = new SkillhubBridge();

const router = express.Router();

router.get("/", asyncMiddleware(async (req, res) => {
    await skillhubBridge.scrapeToSkillhub();
    res.send({status: "success"});
}));

module.exports = router;
