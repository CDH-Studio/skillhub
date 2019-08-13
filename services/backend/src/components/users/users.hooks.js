const {authenticate} = require("@feathersjs/authentication").hooks;
const {hashPassword, protect} = require("@feathersjs/authentication-local").hooks;
const errors = require("@feathersjs/errors");

const EMAIL_REGEX = /^\S+@\S+$/;

const validateUserInfo = () => (context) => {
    const {email, password} = context.data;

    if (!email || !password) {
        throw new errors.BadRequest("Missing credentials");
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new errors.BadRequest("Invalid email");
    }
};

const linkExistingProfile = () => async (context) => {
    if (context.result) {
        const result = await context.app.service("profiles").patch(null, {
            userId: context.result.id
        }, {
            query: {
                $limit: 1,
                contactEmail: context.result.email
            }
        });
        if (result.length > 0) {
            context.result.linkedProfile = true;
        }
    }

    return context;
};

module.exports = {
    before: {
        all: [],
        find: [authenticate("jwt")],
        get: [authenticate("jwt")],
        create: [validateUserInfo(), hashPassword()],
        update: [hashPassword(), authenticate("jwt")],
        patch: [hashPassword(), authenticate("jwt")],
        remove: [authenticate("jwt")]
    },

    after: {
        all: [
            // Make sure the password field is never sent to the client
            // Always must be the last hook
            protect("password")
        ],
        find: [],
        get: [],
        create: [linkExistingProfile()],
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
