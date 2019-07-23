const hydrate = require("feathers-sequelize/hooks/hydrate");

/* An 'after' hook that can be used to optionally specify if the returned results
 * should be hydrated into Sequelize instances.
 *
 * It should be last hook in the list of 'after' hooks for a given service method.
 *
 * This functionality can be used internally in the backend by passing params as
 * the second argument to most service methods. For example:
 *
 * ```
 * service.create(someData, {hydrate: true})
 * ```
 */
const parameterizedHydrate = () => (context) => {
    const {hydrate: shouldHydrate} = context.params;

    if (shouldHydrate) {
        // Hydrate needs to be called in the context of a service method.
        return hydrate().call(context.service, context);
    } else {
        return context;
    }
};

module.exports = parameterizedHydrate;
