class Project {
    /* Extracts the projectProfiles from the associated profile objects
     * and replaces the profiles as a top-level attribute of the project objects. */
    static liftProjectProfiles(project) {
        const processedProject = {...project};
        delete processedProject.profiles;

        processedProject.projectProfiles = project.profiles.reduce((acc, {projectProfiles}) => {
            if (projectProfiles) {
                acc.push(projectProfiles);
            }

            return acc;
        }, []);

        return processedProject;
    }

    static liftProjectsProfiles(projects = []) {
        if (!Array.isArray(projects)) {
            return this.processProjectProfiles(projects);
        }
        else {
            return projects.map((project) => (
                this.processProjectProfiles(project)
            ));
        }
    }
}

module.exports = Project;
