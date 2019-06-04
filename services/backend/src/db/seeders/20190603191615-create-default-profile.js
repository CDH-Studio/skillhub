'use strict';
const tableNames = require("db/tableNames");
const {PROFILES, PROFILE_IDS} = require("db/seedData");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const profiles = await queryInterface.rawSelect(tableNames.PROFILES, {
            where: {
                id: {
                    [Sequelize.Op.in]: PROFILE_IDS
                }
            }
        }, ["id"]);

        if (!profiles) {
            await queryInterface.bulkInsert(tableNames.PROFILES, PROFILES);
        }
    },
    down: async (queryInterface, Sequelize) => {
        const OpIn = Sequelize.Op.in;

        await queryInterface.bulkDelete(tableNames.PROFILES, {id: {[OpIn]: PROFILE_IDS}});
    }
};
