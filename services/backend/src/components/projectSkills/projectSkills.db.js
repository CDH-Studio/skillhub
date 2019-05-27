const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {projectSkillsSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    const projectSkills = sequelizeClient.define(tableNames.PROJECT_SKILLS, projectSkillsSchema(DataTypes), {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });

    // eslint-disable-next-line no-unused-vars
    projectSkills.associate = function(models) {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return projectSkills;
};
