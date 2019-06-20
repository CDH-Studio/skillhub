const {authenticate} = require("@feathersjs/authentication").hooks;
const dehydrate = require("feathers-sequelize/hooks/dehydrate");
const {arrayToObject} = require("utils/helperFunctions");
const {Profile} = require("utils/models");

const includeSkills = () => (context) => {
    const SkillsModel = context.app.services.skills.Model;

    context.params.sequelize = {
        include: [{model: SkillsModel}],
        raw: false
    };

    return context;
};

const processProfileSkills = () => (context) => {
    context.result = Profile.processProfileSkills(context.result);
    return context;
};

const preventBulkDuplication = () => async (context) => {
    const {data: users} = context;

    // This hook is only for handling duplication detection when doing a bulk (i.e. array) create
    if (!Array.isArray(users)) {
        return context;
    }

    const profilesService = context.app.service("profiles");

    const emails = users.map(({contactEmail}) => contactEmail);
    const existingProfiles = await profilesService.find({query: {contactEmail: {$in: emails}}});

    if (users.length !== existingProfiles.length) {
        // Convert the profiles to an object for constant time email lookups, as opposed to linear array searches
        const profilesByEmail = existingProfiles.reduce(arrayToObject({property: "contactEmail"}), {});
        const usersToAdd = users.filter((user) => !(user.contactEmail in profilesByEmail));

        context.data = usersToAdd;
    } else {
        // Empty out the data so that Feathers doesn't bother actually trying to create any profiles
        context.data = [];
    }

    return context;
};

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [includeSkills()],
        get: [includeSkills()],
        create: [preventBulkDuplication()],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [dehydrate(), processProfileSkills()],
        get: [dehydrate(), processProfileSkills()],
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
