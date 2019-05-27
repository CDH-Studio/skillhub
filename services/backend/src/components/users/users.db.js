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

    users.associate = function(models) {
        users.hasOne(models.profiles);
        users.hasMany(models.projectChangeRecords);
    };

    return users;
};
