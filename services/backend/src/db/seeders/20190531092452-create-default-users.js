const tableNames = require("db/tableNames");
const {USERS, USER_IDS} = require("db/seedData");
const {seederGenerator} = require("db/utils");

module.exports = seederGenerator(tableNames.USERS, USERS, USER_IDS);
