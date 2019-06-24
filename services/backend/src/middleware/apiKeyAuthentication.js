const Strategy = require("passport-custom");

/* Custom authentication middleware for adding the ability to authenticate other
 * users/services using custom API keys.
 *
 * @params {string} header              The header to look for the API key in the request.
 * @params {string[]} allowedApiKeys    The set list of API keys that are authenticatable.
 */
const apiKeyAuthentication = ({header = "", allowedApiKeys = []}) => {
    // NOTE: This has to return a regular function (as opposed to an arrow function),
    // so that 'this' doesn't get auto-bound; otherwise, we don't have access to
    // 'this.passport' after the regular 'authentication' middleware gets configured.
    return function() {
        const verifier = (req, done) => {
            if (!(header in req.params.headers)) {
                return done(null, false);
            }

            const apiKey = req.params.headers[header];
            const validKey = allowedApiKeys.includes(apiKey);

            const user = validKey ? "api" : validKey;
            return done(null, user);
        };

        this.passport.use("apiKey", new Strategy(verifier));
        this.passport.options("apiKey", {});
    };
};

module.exports = apiKeyAuthentication;
