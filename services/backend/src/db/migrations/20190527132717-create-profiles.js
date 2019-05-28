const tableNames = require("db/tableNames");
const {profilesSchema} = require("db/schemas");
const {addDateFields, addForeignKey} = require("db/utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.PROFILES, addDateFields(Sequelize, profilesSchema));

        await queryInterface.addIndex(tableNames.PROFILES, ["name"]);
        await addForeignKey(queryInterface, Sequelize)(tableNames.PROFILES, tableNames.USERS, "userId");
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.PROFILES);
    }
};
