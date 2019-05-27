const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {profileSkillsSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    const profileSkills = sequelizeClient.define(tableNames.PROFILE_SKILLS, profileSkillsSchema(DataTypes), {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });

    // eslint-disable-next-line no-unused-vars
    profileSkills.associate = function(models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return profileSkills;
};
