const tableNames = require("db/tableNames");
const {USERS, USER_IDS} = require("db/seedData");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = await queryInterface.rawSelect(tableNames.USERS, {
            where: {
                id: {
                    [Sequelize.Op.in]: USER_IDS
                }
            }
        }, ["id"]);

        if (!users) {
            await queryInterface.bulkInsert(tableNames.USERS, USERS);
        }
    },
    down: async (queryInterface, Sequelize) => {
        const OpIn = Sequelize.Op.in;

        await queryInterface.bulkDelete(tableNames.USERS, {id: {[OpIn]: USER_IDS}});
    }
};
