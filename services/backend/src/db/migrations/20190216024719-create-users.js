const tableNames = require("db/tableNames");
const {usersSchema} = require("db/schemas");
const {addDateFields} = require("db/utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.USERS, addDateFields(Sequelize, usersSchema));
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.USERS);
    }
};
