const addForeignKey = (queryInterface, Sequelize) => async (source, target, columnName) => {
    await queryInterface.addColumn(source, columnName, {
        type: Sequelize.UUID,
        references: {
            model: target,
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    });

    await queryInterface.addIndex(source, [columnName]);
};

module.exports = addForeignKey;
