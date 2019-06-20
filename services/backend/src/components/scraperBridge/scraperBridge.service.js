// Initializes the `scraperBridge` service on path `/scraperBridge`
const hooks = require("./scraperBridge.hooks");

class ScraperBridgeService {
    setup(app) {
        this.app = app;
    }

    async create(data) {
        const {users} = data;
        const profilesService = this.app.service("profiles");

        const result = await profilesService.create(users);

        return {
            status: "success",
            message: `${users.length} users were scraped; ${result.length} new users were created.`
        };
    }
}

module.exports = (app) => {
    app.use("/scraperBridge", new ScraperBridgeService());

    // Get our initialized service so that we can register hooks
    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
