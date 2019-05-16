const Sequelize = require("sequelize");
const allConfig = require("./config/config.json");

const env = process.env.NODE_ENV || "development";

module.exports = function (app) {
    const config = allConfig[env];
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    const oldSetup = app.setup;

    app.set("sequelizeClient", sequelize);

    app.setup = function (...args) {
        const result = oldSetup.apply(this, args);

        // Set up data relationships
        const models = sequelize.models;
        Object.keys(models).forEach(name => {
            if ("associate" in models[name]) {
                models[name].associate(models);
            }
        });

        return result;
    };
};
