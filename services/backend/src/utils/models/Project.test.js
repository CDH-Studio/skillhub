const Project = require("./Project");

describe("liftProjectsProfiles", () => {
    it("takes just the projectProfiles and removes the profile data", () => {
        const projects = [
            // Multiple profiles at once
            {profiles: [{projectProfiles: {id: "1"}}, {projectProfiles: {id: "3"}}]},
            // Just one profile
            {profiles: [{projectProfiles: {id: "2"}}]},
            // Somehow, there are is a profile with no associated projectProfile
            {profiles: [{}]},
            // There are no profiles
            {profiles: []}
        ];

        const processedProjects = [
            {projectProfiles: [{id: "1"}, {id: "3"}]},
            {projectProfiles: [{id: "2"}]},
            {projectProfiles: []},
            {projectProfiles: []}
        ];

        expect(Project.liftProjectsProfiles(projects)).toEqual(processedProjects);
    });

    it("takes just the projectProfiles and removes the profile data from a single profile", () => {
        const project = {profiles: [{projectProfiles: {id: "1"}}, {projectProfiles: {id: "3"}}]};
        const processedProject = {projectProfiles: [{id: "1"}, {id: "3"}]};

        expect(Project.liftProjectsProfiles(project)).toEqual(processedProject);
    });

    it("returns an empty array when there are no projects to process", () => {
        expect(Project.liftProjectsProfiles()).toEqual([]);
        expect(Project.liftProjectsProfiles([])).toEqual([]);
    });
});
