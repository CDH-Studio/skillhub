const tableNames = require("db/tableNames");
const {SKILLS, SKILL_IDS} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.SKILLS, SKILLS, SKILL_IDS);
