// Initializes the `scraperBridge` service on path `/scraperBridge`
const hooks = require("./scraperBridge.hooks");

class ScraperBridgeService {
    setup(app) {
        this.app = app;
    }

    async create(data) {
        const {usersByEmail} = data;
        const profilesService = this.app.service("profiles");

        const emails = Object.keys(usersByEmail);
        const existingProfiles = await profilesService.find({query: {contactEmail: {$in: emails}}});

        if (emails.length !== existingProfiles.length) {
            const profilesByEmail = existingProfiles.reduce((acc, profile) => {
                acc[profile.contactEmail] = profile;
                return acc;
            }, {});

            const usersToAdd = emails.reduce((acc, email) => {
                if (!(email in profilesByEmail)) {
                    acc.push(usersByEmail[email]);
                }

                return acc;
            }, []);

            await profilesService.create(usersToAdd);

            return {status: "success", message: "Created new users", data: usersToAdd};
        } else {
            return {status: "success", message: "All users exist; no new ones created"};
        }
    }
}

module.exports = (app) => {
    app.use("/scraperBridge", new ScraperBridgeService());

    // Get our initialized service so that we can register hooks
    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
