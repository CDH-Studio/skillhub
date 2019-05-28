/* This is useful for adding the date fields to the schemas as part of the migrations,
 * since creating the actual Sequelize models with `sequelize.define` automatically
 * adds the date fields. */
const addDateFields = (Sequelize, schema) => ({
    ...schema(Sequelize),
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
});

module.exports = addDateFields;
