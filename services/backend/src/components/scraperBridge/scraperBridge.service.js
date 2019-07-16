// Initializes the `scraperBridge` service on path `/scraperBridge`
const {PredictionsService} = require("externalServices/");
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

        this.predictionsService = new PredictionsService();
    }

    async create(data) {
        const {issues, projects, users} = data;

        const responseData = {};

        if (users) {
            const usersResult = await this.createUsers(users);

            responseData.users = {
                scraped: users.length,
                created: usersResult.length
            };
        }

        if (projects) {
            const projectsResult = await this.createProjects(projects);

            responseData.projects = {
                scraped: projects.length,
                created: projectsResult.length
            };
        }

        if (issues) {
            await this.createContributors(issues);
        }

        return {
            status: "success",
            data: responseData
        };
    }

    async createUsers(users = []) {
        const profilesService = this.app.service("profiles");
        return await profilesService.create(users);
    }

    async createProjects(projects = []) {
        const projectsService = this.app.service("projects");
        return await projectsService.create(projects);
    }

    async createContributors(issues = []) {
        const projectsService = this.app.service("projects");
        const profilesService = this.app.service("profiles");

        const predictionsResult = this.predictionsService.predictContributors(issues);
        const {predictions = {}} = predictionsResult.data;

        for (const projectKey in predictions) {
            const profiles = [];
            const names = predictions[projectKey];

            for (const name in names) {
                const {prediction} = names[name];

                if (prediction) {
                    const profile = await profilesService.create({name}, {hydrate: true});
                    profiles.push(profile);
                }
            }

            if (profiles.length) {
                await projectsService.create({
                    jiraKey: projectKey,
                    name: projectKey,
                    description: projectKey,
                    profiles
                });
            }
        }
    }
}

module.exports = (app) => {
    app.use("/scraperBridge", new ScraperBridgeService());

    // Get our initialized service so that we can register hooks
    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
