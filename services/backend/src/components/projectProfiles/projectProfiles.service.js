// Initializes the `projectProfiles` service on path `/projectProfiles`
const createService = require("feathers-sequelize");
const createModel = require("./projectProfiles.db");
const hooks = require("./projectProfiles.hooks");

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get("paginate");

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use("/projectProfiles", createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service("projectProfiles");

    service.hooks(hooks);
};
