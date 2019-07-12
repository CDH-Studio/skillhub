const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {projectProfilesSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    const projectProfiles = sequelizeClient.define(
        tableNames.PROJECT_PROFILES,
        {
            ...projectProfilesSchema(DataTypes),
            projectId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                autoIncrement: false
            },
            profileId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                autoIncrement: false
            }
        },
        {
            hooks: {
                beforeCount(options) {
                    options.raw = true;
                }
            }
        }
    );

    // eslint-disable-next-line no-unused-vars
    projectProfiles.associate = function(models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return projectProfiles;
};
