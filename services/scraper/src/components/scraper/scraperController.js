const express = require("express");
const router = express.Router();
const {asyncMiddleware} = require("middleware");

router.get("/", asyncMiddleware(async (req, res) => {
    res.send({status: "success", message: "Scraper endpoint is working!"});
}));

module.exports = router;
