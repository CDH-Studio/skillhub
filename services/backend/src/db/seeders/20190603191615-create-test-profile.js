const tableNames = require("db/tableNames");
const {TEST_PROFILE, TEST_PROFILE_ID} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.PROFILES, TEST_PROFILE, TEST_PROFILE_ID);
