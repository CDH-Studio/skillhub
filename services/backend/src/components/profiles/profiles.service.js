// Initializes the `profiles` service on path `/profiles`
const createService = require("feathers-sequelize");
const createModel = require("./profiles.db");
const hooks = require("./profiles.hooks");

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get("paginate");

    const options = {
        Model,
        paginate,
        multi: ["create"]
    };

    // Initialize our service with any options it requires
    app.use("/profiles", createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service("profiles");

    service.hooks(hooks);
};
