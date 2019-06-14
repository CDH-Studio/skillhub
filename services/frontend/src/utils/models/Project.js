import uuidv4 from "uuid/v4";
import {arrayToObject} from "utils/helperFunctions";

const THIRTY_DAYS = 60 * 60 * 24 * 30 * 1000;  // Milliseconds for 30 days

export default class Project {
    constructor({
        id = uuidv4(), name = "", description = "",
        lastActive = null, createdAt = new Date(), updatedAt = new Date(),
        skills = [], projectProfiles = []
    } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.lastActive = lastActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

        // Aggregate/derived (from store) properties
        this.skills = skills;

        // Temporary related properties; might exist from API results, but aren't used past initial processing
        this.projectProfiles = projectProfiles;
    }

    static get FILTER_ALL() {return "all";}
    static get FILTER_ACTIVE() {return "active";}
    static get FILTER_INACTIVE() {return "inactive";}

    /* Normalizes the list of projects that the API returns into a map of {ID -> project},
     * with the skills processed to just their IDs, for appropriate use in the Redux store. */
    static normalizeApiResultsForRedux(projects = []) {
        const processProject = (project) => {
            const processedProject = new Project(project);

            if (processedProject.skills) {
                processedProject.skills = processedProject.skills.map(({id}) => id);
            } else {
                processedProject.skills = [];
            }

            return processedProject;
        };

        return projects.reduce(arrayToObject(processProject), {});
    }

    static extractProjectProfiles(projects = []) {
        return projects.reduce((acc, project) => [...acc, ...project.projectProfiles], []);
    }

    /* An active project is (currently) defined as having been active within the last 30 days. */
    static isActive(project = {}) {
        if (!project) {
            return false;
        }

        return ((new Date()) - new Date(project.lastActive)) < THIRTY_DAYS;
    }

    static filterProjects(projects, filter = Project.FILTER_ALL) {
        if (filter === Project.FILTER_ALL) {
            return projects;
        } else if (filter === Project.FILTER_ACTIVE) {
            return projects.filter((project) => Project.isActive(project)).sort(sortLastActiveFirst);
        } else if (filter === Project.FILTER_INACTIVE) {
            return projects.filter((project) => !Project.isActive(project));
        } else {
            return projects;
        }
    }

    /* Denormalize a set of projects that have skill IDs with the corresponding set of skills. */
    static mergeWithSkills(projectsById = {}, skillsById = {}) {
        return Object.keys(projectsById).map((projectId) => {
            const project = {...projectsById[projectId]};

            project.skills = project.skills.reduce((acc, skillId) => {
                if (skillId in skillsById) {
                    acc = [...acc, skillsById[skillId].name];
                }

                return acc;
            }, []);

            return project;
        });
    }
}

const sortLastActiveFirst = (a, b) => new Date(b.lastActive) - new Date(a.lastActive);
