const THIRTY_DAYS = 60 * 60 * 24 * 30 * 1000;  // Milliseconds for 30 days

export default class Project {
    static get FILTER_ALL() {return "all";}
    static get FILTER_ACTIVE() {return "active";}
    static get FILTER_INACTIVE() {return "inactive";}

    static isActive(project = {}) {
        // An active project is (currently) defined as having been active within the last 30 days.
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
}

const sortLastActiveFirst = (a, b) => new Date(b.lastActive) - new Date(a.lastActive);
