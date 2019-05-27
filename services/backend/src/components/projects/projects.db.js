const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {projectsSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    const projects = sequelizeClient.define(tableNames.PROJECTS, projectsSchema(DataTypes), {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });

    projects.associate = function(models) {
        projects.belongsToMany(models.profiles, {through: models.projectProfiles, foreignKey: "projectId"});
        projects.belongsToMany(models.skills, {through: models.projectSkills, foreignKey: "projectId"});
        projects.hasMany(models.projectChangeRecords);
    };

    return projects;
};
