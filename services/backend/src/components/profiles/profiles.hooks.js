const {authenticate} = require("@feathersjs/authentication").hooks;
const dehydrate = require("feathers-sequelize/hooks/dehydrate");
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
    const {data} = context;

    if (!Array.isArray(data)) {
        return context;
    }

    const usersByEmail = data.reduce((acc, user) => {
        acc[user.contactEmail] = user;
        return acc;
    }, {});

    const profilesService = context.app.service("profiles");

    const emails = Object.keys(usersByEmail);
    const existingProfiles = await profilesService.find({query: {contactEmail: {$in: emails}}});

    if (emails.length !== existingProfiles.length) {
        const profilesByEmail = existingProfiles.reduce((acc, profile) => {
            acc[profile.contactEmail] = profile;
            return acc;
        }, {});

        const usersToAdd = emails.reduce((acc, email) => {
            if (!(email in profilesByEmail)) {
                acc.push(usersByEmail[email]);
            }

            return acc;
        }, []);

        context.data = usersToAdd;
    } else {
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
