// Initializes the `scraperBridge` service on path `/scraperBridge`
const uuidv4 = require("uuid/v4");
const {PredictionsService} = require("externalServices/");
const {logger: baseLogger} = require("utils/");
const hooks = require("./scraperBridge.hooks");

const logger = baseLogger.child({module: "ScraperBridgeService"});

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
        logger.info("Starting ingestion of scraped data");

        const {issues, projects, users, skillsStats} = data;

        const result = {};

        if (users) {
            const usersResult = await this._createUsers(users);
            result.users = usersResult;
        }

        if (projects) {
            const projectsResult = await this._createProjects(projects);
            result.projects = projectsResult;
        }

        if (issues) {
            const contributorsResult = await this._createContributors(issues);
            result.contributors = contributorsResult;
        }

        if (skillsStats) {
            const skillsResult = await this._createSkills(skillsStats);
            result.skills = skillsResult;
        }

        logger.info({message: "Finished ingestion of scraped data", result});

        return {
            status: "success",
            result
        };
    }

    async _createUsers(users = []) {
        logger.info({
            message: "Starting to create users",
            usersCount: users.length
        });

        const profilesService = this.app.service("profiles");
        const createdProfiles = await profilesService.create(users);

        const result = {
            scraped: users.length,
            created: createdProfiles.length
        };

        logger.info({message: "Finished creating users", result});
        return result;
    }

    async _createProjects(projects = []) {
        logger.info({
            message: "Starting to create projects",
            projectsCount: projects.length
        });

        const projectsService = this.app.service("projects");
        const createdProjects = await projectsService.create(projects);

        const result = {
            scraped: projects.length,
            created: createdProjects.length
        };

        logger.info({message: "Finished creating projects", result});
        return result;
    }

    /* Handles taking the issues, sending them off to the predictions service, and
     * saving the resulting project contributors back to the database. */
    async _createContributors(issues = []) {
        // Create a unique logger for each instance of this function,
        // since it can/will be called in parallel.
        const contributorsLogger = logger.child({processId: uuidv4()});

        contributorsLogger.info({
            message: "Starting to create contributors",
            issuesCount: issues.length
        });

        let result = {};

        // Perform contribution predictions. `predictions` is of the following form:
        // {
        //     [project key]: {
        //         [person name]: {
        //             prediction: true/false
        //         }
        //     }
        // }
        contributorsLogger.info("Querying predictions service...");
        const predictions = await this.predictionsService.predictContributors(issues);
        contributorsLogger.info({message: "Finished querying predictions service", result: predictions});

        const projectKeys = Object.keys(predictions);

        // Get the baseline counts for how many contributors each project has;
        // used later to calculate how many new ones are created.
        const existingCountsByProject = await this._getContributorsCountByProject(projectKeys);

        // Save all of the actual contributors (i.e. the ones who were predicted as 'true') to the database
        // and tally up how many contributors were scraped for each project
        for (const projectKey of projectKeys) {
            const scrapedContributors = await this._createContributorsForProject(projectKey, predictions[projectKey]);

            result[projectKey] = {scraped: scrapedContributors.length};
        }

        // Get the updated per-project contributor counts
        const updatedCountsByProject = await this._getContributorsCountByProject(projectKeys);

        // Calculate the number of new contributors that were created and add them to the `result`
        result = this._calculateCreatedContributorsCount(
            result, projectKeys, existingCountsByProject, updatedCountsByProject
        );

        contributorsLogger.info({message: "Finished creating contributors", result});
        return result;
    }

    async _createSkills(skillsStats) {
        logger.info({message: "Starting to create skills"});

        const profilesService = this.app.service("profiles");
        const skillsService = this.app.service("skills");

        const result = {imported: 0};

        // Get the list of existing profile emails for use by the predictions service
        // to match the git emails back to actual profiles
        const existingProfiles = await profilesService.find({query: {$select: ["contactEmail"]}});
        const existingEmails = await existingProfiles.map(({contactEmail}) => contactEmail);

        // Get the skill predictions in the form of `{[email]: [LIST_OF_SKILL_NAMES]}`
        const predictions = await this.predictionsService.predictSkills(skillsStats, existingEmails);

        const emails = Object.keys(predictions);
        const skillsCache = {};

        for (const email of emails) {
            const skillNames = predictions[email];

            // Try to find the profile object that matches the email;
            // could potentially have an unknown email slip through the predictions service.
            const profiles = await profilesService.find({query: {contactEmail: email}});

            if (!profiles.length) {
                continue;
            }

            const profile = profiles[0];
            const skills = [];

            for (const skillName of skillNames) {
                let skill;

                if (skillName in skillsCache) {
                    skill = skillsCache[skillName];
                } else {
                    skill = await skillsService.create({name: skillName});

                    // Cache the skill so that we don't have to keep looking it up for subsequent profiles
                    skillsCache[skillName] = skill;
                }

                skills.push(skill);
            }

            await profilesService.create({id: profile.id, skills});
            result.imported += skills.length;
        }

        logger.info({message: "Finished creating skills", result});
        return result;
    }

    async _createContributorsForProject(projectKey = "", projectPredictions = {}) {
        const projectsService = this.app.service("projects");
        const profilesService = this.app.service("profiles");

        const profiles = [];

        for (const name in projectPredictions) {
            const {prediction} = projectPredictions[name];
            const reformattedName = reformatLastNameFirst(name);

            if (prediction) {
                const profile = await profilesService.create({name: reformattedName}, {hydrate: true});
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

    _calculateCreatedContributorsCount(result, projectKeys, existingCounts, updatedCounts) {
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
        }, result);
    }
}

const reformatLastNameFirst = (name) => {
    if (name.includes(",")) {
        const splitName = name.split(",").map((n) => n.trim());
        return `${splitName[1]} ${splitName[0]}`;
    }

    return name;
};

module.exports = (app) => {
    app.use("/scraperBridge", new ScraperBridgeService());

    const service = app.service("scraperBridge");
    service.hooks(hooks);
};
