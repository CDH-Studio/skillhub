const tableNames = require("db/tableNames");
const {PROJECTS, PROJECT_IDS} = require("db/seedData");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const projects = await queryInterface.rawSelect(tableNames.PROJECTS, {
            where: {
                id: {
                    [Sequelize.Op.in]: PROJECT_IDS
                }
            }
        }, ["id"]);

        if (!projects) {
            await queryInterface.bulkInsert(tableNames.PROJECTS, PROJECTS);
        }
    },
    down: async (queryInterface, Sequelize) => {
        const OpIn = Sequelize.Op.in;

        await queryInterface.bulkDelete(tableNames.PROJECTS, {id: {[OpIn]: PROJECT_IDS}});
    }
};
