// Initializes the `skills` service on path `/skills`
const createService = require("feathers-sequelize");
const createModel = require("./skills.db");
const hooks = require("./skills.hooks");

module.exports = function (app) {
    const Model = createModel(app);
    const paginate = app.get("paginate");

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use("/skills", createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service("skills");

    service.hooks(hooks);
};
