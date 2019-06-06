const tableNames = require("db/tableNames");
const {PROJECT_SKILLS, PROJECT_SKILL_IDS} = require("db/seedData");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const projectSkills = await queryInterface.rawSelect(tableNames.PROJECT_SKILLS, {
            where: {
                id: {
                    [Sequelize.Op.in]: PROJECT_SKILL_IDS
                }
            }
        }, ["id"]);

        if (!projectSkills) {
            await queryInterface.bulkInsert(tableNames.PROJECT_SKILLS, PROJECT_SKILLS);
        }
    },
    down: async (queryInterface, Sequelize) => {
        const OpIn = Sequelize.Op.in;

        await queryInterface.bulkDelete(tableNames.PROJECT_SKILLS, {id: {[OpIn]: PROJECT_SKILL_IDS}});
    }
};
