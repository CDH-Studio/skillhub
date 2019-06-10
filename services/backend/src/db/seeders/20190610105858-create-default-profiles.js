const tableNames = require("db/tableNames");
const {PROFILES, PROFILE_IDS} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.PROFILES, PROFILES, PROFILE_IDS);
