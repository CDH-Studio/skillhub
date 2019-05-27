// Initializes the `projectChangeRecords` service on path `/projectChangeRecords`
const createService = require("feathers-sequelize");
const createModel = require("./projectChangeRecords.db");
const hooks = require("./projectChangeRecords.hooks");

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get("paginate");

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use("/projectChangeRecords", createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service("projectChangeRecords");

    service.hooks(hooks);
};
