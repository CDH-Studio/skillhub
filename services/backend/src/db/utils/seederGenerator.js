module.exports = (tableName, seedData, seedDataIds) => ({
    up: async (queryInterface, Sequelize) => {
        const data = await queryInterface.rawSelect(tableName, {
            where: {
                id: {
                    [Sequelize.Op.in]: seedDataIds
                }
            }
        }, ["id"]);

        if (!data) {
            await queryInterface.bulkInsert(tableName, seedData);
        }
    },
    down: async (queryInterface, Sequelize) => {
        const OpIn = Sequelize.Op.in;

        await queryInterface.bulkDelete(tableName, {id: {[OpIn]: seedDataIds}});
    }
});
