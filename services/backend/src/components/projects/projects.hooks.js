const {authenticate} = require("@feathersjs/authentication").hooks;
const errors = require ("@feathersjs/errors");
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

const validateProjectInfo = () => (context) => {
    const emptyFields = Object.keys(context.data).reduce((acc, field) => {
        if (!context.data[field]) {
            // ex. Converts "contactEmail" to "contact email"
            const errorMessageSpecifier = field.split(/(?=[A-Z])/).join(" ").toLowerCase();
            acc[field] = "Invalid " + errorMessageSpecifier;
        }
        return acc;
    }, {});

    if (Object.entries(emptyFields).length !== 0) {
        throw new errors.BadRequest("Missing Data", emptyFields);
    }
};

const liftProjectsProfiles = () => (context) => {
    context.result = Project.liftProjectsProfiles(context.result);
    return context;
};

const addProfiles = () => async (context) => {
    // This hook only works with profile objects that are Sequelize instances
    // (e.g. they've been retrieved from a route that supports hydration, or have been
    // queried directly using the Sequelize client).
    //
    // Passing regular (i.e. raw) objects in the 'profiles' key will result in an error.
    //
    // Also, the hook needs to be used after a `hydrate` hook, since the 'project' object
    // also has to be a Sequelize instance.
    const {profiles} = context.data;

    if (profiles) {
        const project = context.result;
        await project.addProfiles(profiles);
    }

    return context;
};

const findOrCreateQueryCustomizer = (data) => {
    // Allows the `findOrCreate` hook to use a more specific query than
    // just the whole data blob when trying to find an existing project.
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
        patch: [
            validateProjectInfo(),
            includeAssociations()],
        remove: []
    },

    after: {
        all: [],
        find: [dehydrate(), liftProjectsProfiles()],
        get: [dehydrate(), liftProjectsProfiles()],
        create: [hydrate(), addProfiles(), dehydrate()],
        update: [],
        patch: [dehydrate(), liftProjectsProfiles()],
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
