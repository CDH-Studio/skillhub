const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {projectProfilesSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    // TODO: FIX THIS HACKY MESS
    const schema = {
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
    };

    const projectProfiles = sequelizeClient.define(tableNames.PROJECT_PROFILES, schema, {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });

    // eslint-disable-next-line no-unused-vars
    projectProfiles.associate = function(models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return projectProfiles;
};
