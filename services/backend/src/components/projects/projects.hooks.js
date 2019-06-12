const {authenticate} = require("@feathersjs/authentication").hooks;
const dehydrate = require("feathers-sequelize/hooks/dehydrate");
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

const extractProjectProfiles = () => (context) => {
    context.result = Project.extractProjectProfiles(context.result);
    return context;
};

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [includeAssociations()],
        get: [includeAssociations()],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [dehydrate(), extractProjectProfiles()],
        get: [dehydrate(), extractProjectProfiles()],
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
