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
            responseData.users = usersResult;
        }

        if (projects) {
            const projectsResult = await this.createProjects(projects);
            responseData.projects = projectsResult;
        }

        if (issues) {
            const contributorsResult = await this.createContributors(issues);
            responseData.contributors = contributorsResult;
        }

        return {
            status: "success",
            result: responseData
        };
    }

    async createUsers(users = []) {
        const profilesService = this.app.service("profiles");
        const result = await profilesService.create(users);

        return {
            scraped: users.length,
            created: result.length
        };
    }

    async createProjects(projects = []) {
        const projectsService = this.app.service("projects");
        const result = await projectsService.create(projects);

        return {
            scraped: projects.length,
            created: result.length
        };
    }

    async createContributors(issues = []) {
        const responseData = {};

        const predictionsResult = await this.predictionsService.predictContributors(issues);
        const {predictions = {}} = predictionsResult.data;

        const projectKeys = Object.keys(predictions);

        const existingCountsByProject = await this._getContributorsCountByProject(projectKeys);

        for (const projectKey of projectKeys) {
            const scrapedContributors = await this._createContributorsForProject(projectKey, predictions[projectKey]);

            responseData[projectKey] = {
                scraped: scrapedContributors.length
            };
        }

        const updatedCountsByProject = await this._getContributorsCountByProject(projectKeys);

        return this._calculateCreatedContributorsCount(
            projectKeys, existingCountsByProject, updatedCountsByProject, responseData
        );
    }

    async _createContributorsForProject(projectKey = "", projectPredictions = {}) {
        const projectsService = this.app.service("projects");
        const profilesService = this.app.service("profiles");

        const profiles = [];

        for (const name in projectPredictions) {
            const {prediction} = projectPredictions[name];

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
            }, {hydrate: true});
        }

        return profiles;
    }

    async _getContributorsCountByProject(projectKeys = []) {
        const projectsService = this.app.service("projects");
        const projects = await projectsService.find({query: {jiraKey: {$in: projectKeys}}});

        return projects.reduce((acc, project) => {
            acc[project.jiraKey] = project.projectProfiles.length;
            return acc;
        }, {});
    }

    _calculateCreatedContributorsCount(projectKeys, existingCounts, updatedCounts, responseData) {
        return projectKeys.reduce((acc, key) => {
            const initialCount = existingCounts[key] || 0;
            const finalCount = updatedCounts[key] || 0;
            const createdCount = finalCount - initialCount;

            if (key in acc) {
                acc[key].created = createdCount;
            } else {
                acc[key] = {
                    scraped: null,
                    created: createdCount
                };
            }

            return acc;
        }, responseData);
    }
}

module.exports = (app) => {
    app.use("/scraperBridge", new ScraperBridgeService());

    // Get our initialized service so that we can register hooks
    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
