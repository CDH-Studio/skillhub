const tableNames = require("db/tableNames");
const {projectChangeRecordsSchema} = require("db/schemas");
const {addForeignKey} = require("db/utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(tableNames.PROJECT_CHANGE_RECORDS, {
            ...projectChangeRecordsSchema(Sequelize),
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        const foreignKeyAdder = addForeignKey(queryInterface, Sequelize);
        await foreignKeyAdder(tableNames.PROJECT_CHANGE_RECORDS, tableNames.USERS, "userId");
        await foreignKeyAdder(tableNames.PROJECT_CHANGE_RECORDS, tableNames.PROJECTS, "projectId");
    },
    down: (queryInterface) => {
        return queryInterface.dropTable(tableNames.PROJECT_CHANGE_RECORDS);
    }
};
