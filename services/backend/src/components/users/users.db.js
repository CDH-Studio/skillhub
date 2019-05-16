const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {usersSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    const users = sequelizeClient.define(tableNames.USERS, usersSchema(DataTypes), {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });

    // eslint-disable-next-line no-unused-vars
    users.associate = function (models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return users;
};
