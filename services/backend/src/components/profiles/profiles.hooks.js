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
    const {skills, skillsToRemove} = context.data;
    const profile = context.result;

    if (skills) {
        for (const skill of skills) {
            await profile.addSkill(skill.id, {through: {isHighlySkilled: skill.isHighlySkilled}});
        }
    }

    return context;
};

const updateSkills = () => async (context) => {
    const {skills, skillsToRemove} = context.data;
    const profile = context.result;

    if (skillsToRemove) {
        await profile.removeSkills(skillsToRemove.map((skill) => skill.id));
    }

    if (skills) {
        for (const skill of skills) {
            await profile.addSkill(skill.id, {through: {isHighlySkilled: skill.isHighlySkilled}});
        }
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

    if (context.data.contactEmail && !EMAIL_REGEX.test(context.data.contactEmail)) {
        throw new errors.BadRequest("Invalid email");
    }
};

const validateField = (field) => (context) => {
    if (context.data.validate && !context.data[field]) {
        const emptyField = {
            [field]: "Invalid " + field
        };
        throw new errors.BadRequest("Missing Data", emptyField);
    }
};

const findOrCreateQueryCustomizer = (data) => {
    // Allows the `findOrCreate` hook to use a more specific query than
    // just the whole data blob when trying to find an existing profile.
    let query = {};

    if ("id" in data) {
        query.id = data.id;
    } else if ("name" in data) {
        query.name = data.name;
    } else {
        query = data;
    }

    return query;
};

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [includeSkills()],
        get: [includeSkills()],
        create: [
            preventBulkDuplication("contactEmail"),
            findOrCreate(findOrCreateQueryCustomizer),
            validateField("name")
        ],
        update: [],
        patch: [
            restrictToOwner({idField: "id", ownerField: "userId"}),
            validatePersonalDetails(),
            includeSkills(),
        ],
        remove: []
    },

    after: {
        all: [],
        find: [dehydrate(), liftProfilesSkills()],
        get: [dehydrate(), liftProfilesSkills()],
        create: [hydrate(), addSkills(), dehydrate(), parameterizedHydrate()],
        update: [],
        patch: [hydrate(), updateSkills(), dehydrate(), liftProfilesSkills()],
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
