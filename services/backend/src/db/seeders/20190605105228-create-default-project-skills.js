const tableNames = require("db/tableNames");
const {PROJECT_SKILLS, PROJECT_SKILL_IDS} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.PROJECT_SKILLS, PROJECT_SKILLS, PROJECT_SKILL_IDS);
