// Initializes the `scraperBridge` service on path `/scraperBridge`
const hooks = require("./scraperBridge.hooks");

/* This service acts as the bridge from the Scraper to Skillhub's backend.
 *
 * Since the Scraper has potential computing constraints in its theoretical production environment
 * (i.e., it might have limited time to do its work, and probably isn't going to be running constantly),
 * then the Skillhub backend will have to do the heavy-lifting of parsing and processing anything
 * complex that the Scraper might not have time to do. 
 */
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
