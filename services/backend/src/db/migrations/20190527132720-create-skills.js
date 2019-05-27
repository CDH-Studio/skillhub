const tableNames = require("db/tableNames");
const {skillsSchema} = require("db/schemas");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.SKILLS, {
            ...skillsSchema(Sequelize),
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.SKILLS);
    }
};
