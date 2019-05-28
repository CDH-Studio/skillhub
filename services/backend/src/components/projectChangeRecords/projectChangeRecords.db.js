const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {projectChangeRecordsSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    const projectChangeRecords = sequelizeClient.define(
        tableNames.PROJECT_CHANGE_RECORDS, projectChangeRecordsSchema(DataTypes),
        {
            hooks: {
                beforeCount(options) {
                    options.raw = true;
                }
            }
        }
    );

    projectChangeRecords.associate = function(models) {
        projectChangeRecords.belongsTo(models.users);
        projectChangeRecords.belongsTo(models.projects);
    };

    return projectChangeRecords;
};
