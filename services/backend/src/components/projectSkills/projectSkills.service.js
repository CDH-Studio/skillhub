// Initializes the `projectSkills` service on path `/projectSkills`
const createService = require("feathers-sequelize");
const createModel = require("./projectSkills.db");
const hooks = require("./projectSkills.hooks");

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get("paginate");

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use("/projectSkills", createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service("projectSkills");

    service.hooks(hooks);
};
