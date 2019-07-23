const tableNames = require("db/tableNames");
const {projectsSchema} = require("db/schemas");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tableDefinition = await queryInterface.describeTable(tableNames.PROJECTS);

        // Need to support both the case where the migrations have already been run up till now,
        // and the case where the migrations are being run from scratch by checking for the column's existence.
        if (!tableDefinition.jiraKey) {
            await queryInterface.addColumn(tableNames.PROJECTS, "jiraKey", projectsSchema(Sequelize).jiraKey);
        }

        await queryInterface.addIndex(tableNames.PROJECTS, ["jiraKey"]);
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn(tableNames.PROJECTS, "jiraKey");
        await queryInterface.removeIndex(tableNames.PROJECTS, ["jiraKey"]);
    }
};
