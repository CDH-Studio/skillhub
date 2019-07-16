const hydrate = require("feathers-sequelize/hooks/hydrate");

const parameterizedHydrate = () => (context) => {
    const {raw} = context.params;

    if (raw) {
        return hydrate().call(context.service, context);
    } else {
        return context;
    }
};

module.exports = parameterizedHydrate;
