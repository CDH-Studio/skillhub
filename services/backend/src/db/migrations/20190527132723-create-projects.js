const tableNames = require("db/tableNames");
const {projectsSchema} = require("db/schemas");
const {addDateFields} = require("db/utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.PROJECTS, addDateFields(Sequelize, projectsSchema));

        await queryInterface.addIndex(tableNames.PROJECTS, ["name"]);
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.PROJECTS);
    }
};
