const {authenticate} = require("@feathersjs/authentication").hooks;

const includeSkills = () => (context) => {
    const SkillsModel = context.app.services.skills.Model;

    context.params.sequelize = {
        include: [{model: SkillsModel}],
        raw: false
    };

    return context;
};

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [includeSkills()],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [],
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
