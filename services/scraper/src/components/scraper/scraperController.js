const express = require("express");
const {asyncMiddleware} = require("middleware");
const {JiraScraper} = require("scrapers");

const jiraScraper = new JiraScraper();

const router = express.Router();

router.get("/", asyncMiddleware(async (req, res) => {
    const users = await jiraScraper.getUsers();
    res.send({status: "success", data: users});
}));

module.exports = router;
