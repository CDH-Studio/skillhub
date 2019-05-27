const tableNames = require("db/tableNames");
const {projectsSchema} = require("db/schemas");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.PROJECTS, {
            ...projectsSchema(Sequelize),
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addIndex(tableNames.PROJECTS, ["name"]);
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.PROJECTS);
    }
};
