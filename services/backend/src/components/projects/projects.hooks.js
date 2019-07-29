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

/*  Checks the passed arguments (context.data) versus the existing project (projectBeforeUpdate)
 *  to and creates changelogs for every changed property. */
const createChangeLog = () => async (context) => {
    const projectId = context.data.id;
    const userId = context.params.user.id;

    const projectBeforeUpdate = await context.app.service("projects").get(projectId);

    for (const fieldKey of Object.keys(context.data)) {
        if (context.data[fieldKey] !== projectBeforeUpdate[fieldKey]) {
            context.app.service("projectChangeRecords").create({
                projectId: projectId,
                userId: userId,
                oldValue: projectBeforeUpdate[fieldKey],
                newValue: context.data[fieldKey],
                changedAttribute: fieldKey
            });
        }
    }

    return context;
};

const validateProjectProfile = (role) => {
    if (!role) {
        throw new errors.BadRequest("Missing Data", "Invalid role");
    }
};

const liftProjectsProfiles = () => (context) => {
    context.result = Project.liftProjectsProfiles(context.result);
    return context;
};

const addProfiles = () => async (context) => {
    // This hook needs to be used after a `hydrate` hook, since the 'project' object
    // has to be a Sequelize instance.
    const {profiles} = context.data;
    const {profile} = context.data;
    const {role} = context.data;

    // If a profile object has been passed create a projectProfile to it
    if (profile) {
        validateProjectProfile(role);

        const project = context.result;
        await project.addProfile(profile.id, {through: {role: role}});
    }

    // If multiple profiles are found create projectProfiles for them
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
            createChangeLog(),
            includeAssociations()
        ],
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
