const tableNames = require("db/tableNames");
const {PROJECT_PROFILES, PROJECT_PROFILE_IDS} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.PROJECT_PROFILES, PROJECT_PROFILES, PROJECT_PROFILE_IDS);
