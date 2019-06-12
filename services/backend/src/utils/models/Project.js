class Project {
    static processProjectProfiles(projects = []) {
        return projects.map((project) => {
            const processedProject = {...project};
            delete processedProject.profiles;

            processedProject.projectProfiles = project.profiles.reduce((acc, {projectProfiles}) => {
                if (projectProfiles) {
                    acc.push(projectProfiles);
                }

                return acc;
            }, []);

            return processedProject;
        });
    }
}

module.exports = Project;
