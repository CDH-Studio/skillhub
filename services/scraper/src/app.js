const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const {errorHandler} = require("middleware");

const {scraperController} = require("components/");

const API_ROOT = "";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// Add controllers
app.use(`${API_ROOT}/scraper`, scraperController);

app.use(errorHandler());

module.exports = app;
