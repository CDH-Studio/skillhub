const tableNames = require("db/tableNames");
const {PROJECTS, PROJECT_IDS} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.PROJECTS, PROJECTS, PROJECT_IDS);
