// Initializes the `scraperBridge` service on path `/scraperBridge`
const hooks = require("./scraperBridge.hooks");
const axios = require("axios");
const {PREDICTIONS_URL} = require("../../config");

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
        const {issues, projects, users} = data;

        const profilesService = this.app.service("profiles");
        const projectsService = this.app.service("projects");
        const projectProfilesService = this.app.service("projectProfiles");

        const projectsResult = await projectsService.create(projects);
        const profilesResult = await profilesService.create(users);

        console.log(projectsResult, "projects");
        console.log(profilesResult, "profiles");

        const result = await axios.post(`${PREDICTIONS_URL}/api/v1/contributors/predict`, issues);
        const predictions = result.data.predictions;

        const projectProfiles = Object.keys(predictions).reduce((acc, key) => {
            const people = predictions[key];

            const things = Object.keys(people).reduce((acc, name) => {
                const person = people[name];

                if (person.prediction) {
                    const project = projectsResult.filter((p) => p.description === key)[0];
                    const profile = profilesResult.filter((p) => p.name === name)[0];

                    acc.push({
                        projectId: project.id,
                        profileId: profile.id,
                        role: "Person"
                    });
                }

                return acc;
            }, []);

            acc = [...acc, ...things];
            return acc;
        }, []);

        await projectProfilesService.create(projectProfiles);

        return {
            status: "success",
            message: "It worked!"
        };

        // return {
        //     status: "success",
        //     message: `
        //         ${projects.length} projects were scraped; ${projectsResult.length} new projects were created.\n
        //         ${users.length} users were scraped; ${usersResult.length} new users were created.
        //     `
        // };
    }
}

module.exports = (app) => {
    app.use("/scraperBridge", new ScraperBridgeService());

    // Get our initialized service so that we can register hooks
    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
