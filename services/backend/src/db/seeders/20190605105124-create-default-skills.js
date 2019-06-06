const tableNames = require("db/tableNames");
const {SKILLS, SKILL_IDS} = require("db/seedData");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const skills = await queryInterface.rawSelect(tableNames.SKILLS, {
            where: {
                id: {
                    [Sequelize.Op.in]: SKILL_IDS
                }
            }
        }, ["id"]);

        if (!skills) {
            await queryInterface.bulkInsert(tableNames.SKILLS, SKILLS);
        }
    },
    down: async (queryInterface, Sequelize) => {
        const OpIn = Sequelize.Op.in;

        await queryInterface.bulkDelete(tableNames.SKILLS, {id: {[OpIn]: SKILL_IDS}});
    }
};
