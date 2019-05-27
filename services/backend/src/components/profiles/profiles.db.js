const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {profilesSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    const profiles = sequelizeClient.define(tableNames.PROFILES, profilesSchema(DataTypes), {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });

    profiles.associate = function(models) {
        profiles.belongsTo(models.users);
        profiles.belongsToMany(models.skills, {through: models.profileSkills, foreignKey: "profileId"});
        profiles.belongsToMany(models.projects, {through: models.projectProfiles, foreignKey: "profileId"});
    };

    return profiles;
};
