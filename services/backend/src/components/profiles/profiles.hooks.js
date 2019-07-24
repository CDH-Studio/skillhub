const {authenticate} = require("@feathersjs/authentication").hooks;
const errors = require("@feathersjs/errors");
const {restrictToOwner} = require("feathers-authentication-hooks");
const dehydrate = require("feathers-sequelize/hooks/dehydrate");
const {findOrCreate, parameterizedHydrate, preventBulkDuplication} = require("hooks/");
const hydrate = require("feathers-sequelize/hooks/hydrate");
const {arrayToObject} = require("utils/helperFunctions");
const {Profile} = require("utils/models");
const tableNames = require("db/tableNames");

const EMAIL_REGEX = /^\S+@\S+$/;

const includeSkills = () => (context) => {
    const SkillsModel = context.app.services.skills.Model;

    context.params.sequelize = {
        include: [{model: SkillsModel}],
        raw: false
    };

    return context;
};

const liftProfilesSkills = () => (context) => {
    context.result = Profile.liftProfilesSkills(context.result);
};

const addSkills = () => async (context) => {
    const {skills} = context.data;
    const skillIds = skills.map(({id}) => id);

    const sequelizeClient = context.app.get("sequelizeClient");
    const SkillsModel = sequelizeClient.models[tableNames.SKILLS];

    const hydratedSkills = await SkillsModel.findAll({
        where: {
            id: skillIds
        }
    });

    if (hydratedSkills) {
        const profile = context.result;
        await profile.addSkills(hydratedSkills);
    }

    return context;
};

const validatePersonalDetails = () => (context) => {
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

    if (!EMAIL_REGEX.test(context.data.contactEmail)) {
        throw new errors.BadRequest("Invalid email");
    }
};

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [includeSkills()],
        get: [includeSkills()],
        create: [preventBulkDuplication("contactEmail"), findOrCreate((data) => ({id: data.id}))],
        update: [],
        patch: [
            restrictToOwner({idField: "id", ownerField: "userId"}),
            validatePersonalDetails(),
            includeSkills()
        ],
        remove: []
    },

    after: {
        all: [],
        find: [dehydrate(), liftProfilesSkills()],
        get: [dehydrate(), liftProfilesSkills()],
        create: [hydrate(), addSkills(), dehydrate(), parameterizedHydrate()],
        update: [],
        patch: [dehydrate(), liftProfilesSkills()],
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
