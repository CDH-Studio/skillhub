import Profile from "./Profile";
import Project from "./Project";
import ProjectProfile from "./ProjectProfile";

describe("mapProfileToProjects", () => {
    const profile = new Profile();
    const project1 = new Project();
    const project2 = new Project();

    const projectsById = {
        [project1.id]: project1,
        [project2.id]: project2
    };

    const projectProfile1 = new ProjectProfile({profileId: profile.id, projectId: project1.id});
    const projectProfile2 = new ProjectProfile({profileId: profile.id, projectId: project2.id});

    const projectProfilesById = {
        [projectProfile1.id]: projectProfile1,
        [projectProfile2.id]: projectProfile2
    };

    const projectProfilesByProfileId = {
        [profile.id]: [projectProfile1.id, projectProfile2.id]
    };

    const projects = [project1, project2];

    it("can get all of the projects for a given user's profile", () => {
        expect(ProjectProfile.mapProfileToProjects(
            profile, projectsById, projectProfilesById, projectProfilesByProfileId
        )).toEqual(projects);
    });
});
