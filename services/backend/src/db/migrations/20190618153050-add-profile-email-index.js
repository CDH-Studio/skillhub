const tableNames = require("db/tableNames");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addIndex(tableNames.PROFILES, ["contactEmail"]);
    },
    down: (queryInterface) => {
        return queryInterface.removeIndex(tableNames.PROFILES, ["contactEmail"]);
    }
};
