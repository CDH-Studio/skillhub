const hydrate = require("feathers-sequelize/hooks/hydrate");

const parameterizedHydrate = () => (context) => {
    const {hydrate} = context.params;

    if (hydrate) {
        return hydrate().call(context.service, context);
    } else {
        return context;
    }
};

module.exports = parameterizedHydrate;
