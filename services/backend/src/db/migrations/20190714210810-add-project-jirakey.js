const tableNames = require("db/tableNames");
const {projectsSchema} = require("db/schemas");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(tableNames.PROJECTS, "jiraKey", projectsSchema(Sequelize).jiraKey;

        await queryInterface.addIndex(tableNames.PROJECTS, ["jiraKey"]);
    },
    down: (queryInterface) => {
        return queryInterface.removeIndex(tableNames.PROJECTS, ["jiraKey"]);
    }
};
