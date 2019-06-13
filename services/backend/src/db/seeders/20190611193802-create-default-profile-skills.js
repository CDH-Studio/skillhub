const tableNames = require("db/tableNames");
const {PROFILE_SKILLS, PROFILE_SKILL_IDS} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.PROFILE_SKILLS, PROFILE_SKILLS, PROFILE_SKILL_IDS);
