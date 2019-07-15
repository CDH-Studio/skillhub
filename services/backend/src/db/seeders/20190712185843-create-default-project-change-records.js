const tableNames = require("db/tableNames");
const {PROJECT_CHANGE_RECORDS, PROJECT_CHANGE_RECORD_IDS} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.PROJECT_CHANGE_RECORDS, PROJECT_CHANGE_RECORDS, PROJECT_CHANGE_RECORD_IDS);
