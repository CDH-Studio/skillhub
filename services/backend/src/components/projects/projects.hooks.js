const {authenticate} = require("@feathersjs/authentication").hooks;
const dehydrate = require("feathers-sequelize/hooks/dehydrate");
const hydrate = require("feathers-sequelize/hooks/hydrate");
const {findOrCreate, preventBulkDuplication} = require("hooks/");
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

const addProfiles = () => async (context) => {
    const {profiles} = context.data;

    if (profiles) {
        const project = context.result;
        await project.addProfiles(profiles);
    }

    return context;
};

const findOrCreateQueryCustomizer = (data) => {
    let query = {};

    if ("id" in data) {
        query.id = data.id;
    } else if ("jiraKey" in data) {
        query.jiraKey = data.jiraKey;
    } else {
        query = data;
    }

    return query;
};

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [includeAssociations()],
        get: [includeAssociations()],
        create: [preventBulkDuplication("jiraKey"), findOrCreate(findOrCreateQueryCustomizer)],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [dehydrate(), processProjectProfiles()],
        get: [dehydrate(), processProjectProfiles()],
        create: [hydrate(), addProfiles(), dehydrate()],
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
