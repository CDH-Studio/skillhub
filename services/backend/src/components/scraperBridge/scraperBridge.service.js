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

    /* The master entrypoint to the service. Handles taking data from the Scraping service,
     * potentially processing it some more, and then storing it in the database. */
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

    /* Handles taking the issues, sending them off to the predictions service, and
     * saving the resulting project contributors back to the database. */
    async createContributors(issues = []) {
        const responseData = {};

        // Perform contribution predictions. `predictions` is of the following form:
        // {
        //     [project key]: {
        //         [person name]: {
        //             prediction: true/false
        //         }
        //     }
        // }
        const predictions = await this.predictionsService.predictContributors(issues);

        const projectKeys = Object.keys(predictions);

        // Get the baseline counts for how many contributors each project has;
        // used later to calculate how many new ones are created.
        const existingCountsByProject = await this._getContributorsCountByProject(projectKeys);

        // Save all of the actual contributors (i.e. the ones who were predicted as 'true') to the database
        // and tally up how many contributors were scraped for each project
        for (const projectKey of projectKeys) {
            const scrapedContributors = await this._createContributorsForProject(projectKey, predictions[projectKey]);

            responseData[projectKey] = {scraped: scrapedContributors.length};
        }

        // Get the updated per-project contributor counts
        const updatedCountsByProject = await this._getContributorsCountByProject(projectKeys);

        // Calculate the number of new contributors that were created and add them to the `responseData`
        return this._calculateCreatedContributorsCount(
            responseData, projectKeys, existingCountsByProject, updatedCountsByProject
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
            // NOTE: The 'create' method has been setup as a 'findOrCreate', so this won't
            // create duplicate projects. It will, however, catch the case where somehow the project
            // wasn't created first.
            await projectsService.create({
                jiraKey: projectKey,
                name: projectKey,
                description: projectKey,
                profiles
            });
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

    _calculateCreatedContributorsCount(responseData, projectKeys, existingCounts, updatedCounts) {
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

    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
