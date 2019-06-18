const Strategy = require("passport-custom");

module.exports = (options) => {
    // NOTE: This has to be a regular function (as opposed to an arrow function),
    // so that 'this' doesn't get auto-bound; otherwise, we don't have access to
    // 'this.passport' after the regular 'authentication' middleware gets configured.
    return function() {
        const verifier = (req, done) => {
            if (!(options.header in req.params.headers)) {
                return done(null, false);
            }

            const apiKey = req.params.headers[options.header];
            const validKey = options.allowedApiKeys.includes(apiKey);

            const user = validKey ? "api" : validKey;
            return done(null, user);
        };

        this.passport.use("apiKey", new Strategy(verifier));
        this.passport.options("apiKey", {});
    };
};
