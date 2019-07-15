// Initializes the `scraperBridge` service on path `/scraperBridge`
const axios = require("axios");
const tableNames = require("db/tableNames");
const {PREDICTIONS_URL} = require("../../config");
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
        const {issues, projects, users} = data;

        if (users) {
            await this.processUsers(users);
        }

        if (projects) {
            await this.processProjects(projects);
        }

        console.log("YOLO");

        if (issues) {
            await this.processIssues(issues);
        }

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

    async processUsers(users = []) {
        const profilesService = this.app.service("profiles");
        const profilesResult = await profilesService.create(users);
    }

    async processProjects(projects = []) {
        const projectsService = this.app.service("projects");
        const projectsResult = await projectsService.create(projects);
    }

    async processIssues(issues = []) {
        const sequelizeClient = this.app.get("sequelizeClient");
        const ProjectsModel = sequelizeClient.models[tableNames.PROJECTS];
        const ProfilesModel = sequelizeClient.models[tableNames.PROFILES];

        const projectProfilesService = this.app.service("projectProfiles");

        console.log("here 1");
        const predictionsResult = await axios.post(
            `${PREDICTIONS_URL}/api/v1/contributors/predict`, issues, {maxContentLength: 100000000}
        );

        const predictions = predictionsResult.data.predictions;

        let projectProfiles = [];

        for (const projectKey in predictions) {
            console.log("here 2");
            const trueProjectProfiles = [];
            const names = predictions[projectKey];

            // TODO: Modify the 'create' method on the service to be a 'findOrCreate'.
            // For reference: https://gist.github.com/marshallswain/9fa3b1e855633af00998
            const project = (await ProjectsModel.findOrCreate({
                where: {jiraKey: projectKey},
                defaults: {name: projectKey, description: projectKey}
            }))[0];

            console.log("here 3");

            for (const name in names) {
                const {prediction} = names[name];

                console.log("here 4");

                if (prediction) {
                    console.log("here 5");

                    const profile = (await ProfilesModel.findOrCreate({where: {name}}))[0];

                    trueProjectProfiles.push({
                        projectId: project.id,
                        profileId: profile.id,
                        role: "Person"
                    });
                }
            }

            console.log(trueProjectProfiles, "trueProjectProfiles");
            projectProfiles = projectProfiles.concat(trueProjectProfiles);
        }

        console.log("here 6");
        console.log(projectProfiles, "projectProfiles");

        await projectProfilesService.create(projectProfiles);
    }
}

module.exports = (app) => {
    app.use("/scraperBridge", new ScraperBridgeService());

    // Get our initialized service so that we can register hooks
    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
