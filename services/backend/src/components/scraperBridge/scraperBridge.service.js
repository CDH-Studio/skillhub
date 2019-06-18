// Initializes the `scraperBridge` service on path `/scraperBridge`
const hooks = require("./scraperBridge.hooks");

class ScraperBridgeService {
    async find() {
        return {status: "success"};
    }
}

module.exports = (app) => {
    app.use("/scraperBridge", new ScraperBridgeService());

    // Get our initialized service so that we can register hooks
    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
