const {authenticate} = require("@feathersjs/authentication").hooks;
const {findOrCreate} = require("hooks/");

const findOrCreateQueryCustomizer = (data) => {
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
        find: [],
        get: [],
        create: [findOrCreate(findOrCreateQueryCustomizer)],
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
