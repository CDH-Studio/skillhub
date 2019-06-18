const {service: profilesService} = require("./profiles");
const {service: profileSkillsService} = require("./profileSkills");
const {service: projectChangeRecordsService} = require("./projectChangeRecords");
const {service: projectProfilesService} = require("./projectProfiles");
const {service: projectsService} = require("./projects");
const {service: projectSkillsService} = require("./projectSkills");
const {service: scraperBridgeService} = require("./scraperBridge");
const {service: skillsService} = require("./skills");
const {service: usersService} = require("./users");

const services = (app) => {
    app.configure(profilesService);
    app.configure(profileSkillsService);
    app.configure(projectChangeRecordsService);
    app.configure(projectProfilesService);
    app.configure(projectProfilesService);
    app.configure(projectsService);
    app.configure(projectSkillsService);
    app.configure(scraperBridgeService);
    app.configure(skillsService);
    app.configure(usersService);
};

module.exports = {
    services
};
