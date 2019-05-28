const tableNames = require("db/tableNames");
const {projectProfilesSchema} = require("db/schemas");
const {addDateFields, addForeignKey} = require("db/utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.PROJECT_PROFILES, addDateFields(Sequelize, projectProfilesSchema));

        const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
        await foreignKeyAdder(tableNames.PROJECT_PROFILES, tableNames.PROFILES, "profileId");
        await foreignKeyAdder(tableNames.PROJECT_PROFILES, tableNames.PROJECTS, "projectId");
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.PROJECT_PROFILES);
    }
};
