const {authenticate} = require("@feathersjs/authentication").hooks;
const dehydrate = require("feathers-sequelize/hooks/dehydrate");
const {arrayToObject} = require("utils/helperFunctions");
const {Project} = require("utils/models");

const includeAssociations = () => (context) => {
    const SkillsModel = context.app.services.skills.Model;
    const ProfilesModel = context.app.services.profiles.Model;

    context.params.sequelize = {
        // Include the Profiles model to get at the ProjectProfiles model data
        include: [{model: SkillsModel}, {model: ProfilesModel}],
        raw: false
    };

    return context;
};

const processProjectProfiles = () => (context) => {
    context.result = Project.processProjectProfiles(context.result);
    return context;
};

const preventBulkDuplication = () => async (context) => {
    const {data: projects} = context;

    // This hook is only for handling duplication detection when doing a bulk (i.e. array) create
    if (!Array.isArray(projects)) {
        return context;
    }

    const projectsService = context.app.service("projects");

    const jiraKeys = projects.map(({jiraKey}) => jiraKey);
    const existingProjects = await projectsService.find({query: {jiraKey: {$in: jiraKeys}}});

    if (projects.length !== existingProjects.length) {
        const projectsByJiraKey = existingProjects.reduce(arrayToObject({property: "jiraKey"}), {});
        const projectsToAdd = projects.filter((project) => !(project.jiraKey in projectsByJiraKey));

        context.data = projectsToAdd;
    } else {
        // Empty out the data so that Feathers doesn't bother actually trying to create any projects
        context.data = [];
    }

    return context;
};

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [includeAssociations()],
        get: [includeAssociations()],
        create: [preventBulkDuplication()],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [dehydrate(), processProjectProfiles()],
        get: [dehydrate(), processProjectProfiles()],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
