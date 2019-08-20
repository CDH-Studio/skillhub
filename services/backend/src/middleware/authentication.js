const authentication = require("@feathersjs/authentication");
const jwt = require("@feathersjs/authentication-jwt");
const local = require("@feathersjs/authentication-local");
const CustomVerifier = require("./CustomVerifier");

module.exports = function (app) {
    const config = app.get("authentication");

    config.jwt.expiresIn = "365d";
    if (process.env.NODE_ENV !== "production") {
        // Developers don't need to have access to the production secret.
        // It doesn't matter if this gets leaked since it only affects the local dev environments.
        config.secret = "19db1e0eeac5b29eff312b0f2ce8cdd1d83865763a40a14f4aea7869807f0d0";
    } else {
        config.secret = process.env.TOKEN_SECRET;
    }

    // Set up authentication with the secret
    app.configure(authentication(config));
    app.configure(jwt());
    app.configure(local({Verifier: CustomVerifier}));

    // The `authentication` service is used to create a JWT.
    // The before `create` hook registers strategies that can be used
    // to create a new valid JWT (e.g. local or oauth2)
    app.service("authentication").hooks({
        before: {
            create: [
                authentication.hooks.authenticate(config.strategies)
            ],
            remove: [
                authentication.hooks.authenticate("jwt")
            ]
        },
        after: {
            create: [
                (context) => {
                    context.result.user = {id: context.params.user.id};
                }
            ]
        }
    });
};
