const express = require("express");
const {asyncMiddleware} = require("middleware/");
const {SkillhubBridge} = require("scrapers/");

const skillhubBridge = new SkillhubBridge();

const router = express.Router();

router.get("/", asyncMiddleware(async (req, res) => {
    const result = await skillhubBridge.scrapeToSkillhub();
    res.send({status: "success", result});
}));

module.exports = router;
