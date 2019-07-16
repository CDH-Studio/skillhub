const hydrate = require("feathers-sequelize/hooks/hydrate");

const parameterizedHydrate = () => (context) => {
    const {hydrate: shouldHydrate} = context.params;

    if (shouldHydrate) {
        return hydrate().call(context.service, context);
    } else {
        return context;
    }
};

module.exports = parameterizedHydrate;
