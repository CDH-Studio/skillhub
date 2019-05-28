const tableNames = require("db/tableNames");
const {profileSkillsSchema} = require("db/schemas");
const {addDateFields, addForeignKey} = require("db/utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.PROFILE_SKILLS, addDateFields(Sequelize, profileSkillsSchema));

        const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
        await foreignKeyAdder(tableNames.PROFILE_SKILLS, tableNames.PROFILES, "profileId");
        await foreignKeyAdder(tableNames.PROFILE_SKILLS, tableNames.SKILLS, "skillId");
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.PROFILE_SKILLS);
    }
};
