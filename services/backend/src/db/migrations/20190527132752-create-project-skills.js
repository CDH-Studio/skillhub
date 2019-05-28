const tableNames = require("db/tableNames");
const {projectSkillsSchema} = require("db/schemas");
const {addDateFields, addForeignKey} = require("db/utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            tableNames.PROJECT_SKILLS,
            addDateFields(Sequelize, projectSkillsSchema)
        );

        const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
        await foreignKeyAdder(tableNames.PROJECT_SKILLS, tableNames.PROJECTS, "projectId");
        await foreignKeyAdder(tableNames.PROJECT_SKILLS, tableNames.SKILLS, "skillId");
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.PROJECT_SKILLS);
    }
};
