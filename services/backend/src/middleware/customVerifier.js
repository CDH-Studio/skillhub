const {Verifier} = require("@feathersjs/authentication-local");
const {omit} = require("lodash");

/* Customization of the authentication verifier found at
 * https://github.com/feathersjs/authentication-local/blob/master/lib/verifier.js
 * Only change can be seen on line 16: with the addition of "$ILike" which allows
 * the verifier to check the email while ignoring case. */
class CustomVerifier extends Verifier {
    verify (req, username, password, done) {

        const id = this.service.id;
        const usernameField = this.options.entityUsernameField || this.options.usernameField;
        const params = Object.assign({
            "query": {
                [usernameField]: {
                    "$iLike": username
                },
                "$limit": 1
            }
        }, omit(req.params, "query", "provider", "headers", "session", "cookies"));

        if (id === null || id === undefined) {
            return done(new Error("the `id` property must be set on the entity service for authentication"));
        }

        // Look up the entity
        this.service.find(params)
            .then((response) => {
                return this._normalizeResult(response);
            })
            .then((entity) => this._comparePassword(entity, password))
            .then((entity) => {
                const id = entity[this.service.id];
                const payload = {[`${this.options.entity}Id`]: id};
                done(null, entity, payload);
            })
            .catch((error) => error ? done(error) : done(null, error, {message: "Invalid login"}));
    }
}

module.exports = CustomVerifier;