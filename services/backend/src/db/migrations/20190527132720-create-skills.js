const tableNames = require("db/tableNames");
const {skillsSchema} = require("db/schemas");
const {addDateFields} = require("db/utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.SKILLS, addDateFields(Sequelize, skillsSchema));
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.SKILLS);
    }
};
