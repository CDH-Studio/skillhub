// Initializes the `profileSkills` service on path `/profileSkills`
const createService = require("feathers-sequelize");
const createModel = require("./profileSkills.db");
const hooks = require("./profileSkills.hooks");

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get("paginate");

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use("/profileSkills", createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service("profileSkills");

    service.hooks(hooks);
};
