const Sequelize = require("sequelize");
const tableNames = require("db/tableNames");
const {skillsSchema} = require("db/schemas");

const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
    const sequelizeClient = app.get("sequelizeClient");

    const skills = sequelizeClient.define(tableNames.SKILLS, skillsSchema(DataTypes), {
        hooks: {
            beforeCount(options) {
                options.raw = true;
            }
        }
    });

    skills.associate = function(models) {
        skills.belongsToMany(models.profiles, {through: models.profileSkills, foreignKey: "skillId"});
        skills.belongsToMany(models.projects, {through: models.projectSkills, foreignKey: "skillId"});
    };

    return skills;
};
