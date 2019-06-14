import Profile from "./Profile";
import Project from "./Project";
import ProjectProfile from "./ProjectProfile";

const profile = new Profile();

const profilesById = {
    [profile.id]: profile
};

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

const projectProfilesByProjectId = {
    [project1.id]: [projectProfile1.id],
    [project2.id]: [projectProfile2.id]
};

const profiles = [profile];
const projects = [project1, project2];
const projectProfiles = [projectProfile1, projectProfile2];

describe("mapProfileIdToProjectProfiles", () => {
    it("can map a profile ID to a list of project profiles", () => {
        expect(ProjectProfile.mapProfileIdToProjectProfiles(
            profile.id, projectProfilesById, projectProfilesByProfileId
        )).toEqual(projectProfiles);
    });

    it("returns an empty array when the profile ID is invalid", () => {
        expect(ProjectProfile.mapProfileIdToProjectProfiles(
            "abc", projectProfilesById, projectProfilesByProfileId
        )).toEqual([]);
    });
});

describe("mapProjectIdToProjectProfiles", () => {
    it("can map a project ID to a list of project profiles", () => {
        expect(ProjectProfile.mapProfileIdToProjectProfiles(
            project1.id, projectProfilesById, projectProfilesByProjectId
        )).toEqual([projectProfile1]);
    });

    it("returns an empty array when the project ID is invalid", () => {
        expect(ProjectProfile.mapProfileIdToProjectProfiles(
            "abc", projectProfilesById, projectProfilesByProjectId
        )).toEqual([]);
    });
});

describe("mapProjectProfilesToProfiles", () => {
    it("can map a list of project profiles into a list of profiles", () => {
        expect(ProjectProfile.mapProjectProfilesToProfiles(
            [projectProfile1], profilesById
        )).toEqual(profiles);
    });

    it("maps a list of project profiles (for the same profile) to a list containing just the one profile", () => {
        expect(ProjectProfile.mapProjectProfilesToProfiles(
            projectProfiles, profilesById
        )).toEqual(profiles);
    });
});

describe("mapProjectProfilesToProjects", () => {
    it("can map a list of project profiles into a list of projects", () => {
        expect(ProjectProfile.mapProjectProfilesToProjects(
            projectProfiles, projectsById
        )).toEqual(projects);
    });

    it("can map a list of project profiles into a list of projects", () => {
        expect(ProjectProfile.mapProjectProfilesToProjects(
            [projectProfile1, new ProjectProfile({projectId: project1.id})], projectsById
        )).toEqual([project1]);
    });
});

describe("mapProfileToProjects", () => {
    it("can get all of the projects for a given user's profile", () => {
        expect(ProjectProfile.mapProfileToProjects(
            profile, projectsById, projectProfilesById, projectProfilesByProfileId
        )).toEqual(projects);
    });

    it("returns an empty array when the profile doesn't exist", () => {
        expect(ProjectProfile.mapProfileToProjects(
            null, projectsById, projectProfilesById, projectProfilesByProfileId
        )).toEqual([]);
    });

    it("returns an empty array when the profile ID is invalid", () => {
        expect(ProjectProfile.mapProfileToProjects(
            new Profile({id: "abc"}), projectsById, projectProfilesById, projectProfilesByProfileId
        )).toEqual([]);
    });

    it("returns an empty array when there are no matching ProjectProfiles for the profile", () => {
        expect(ProjectProfile.mapProfileToProjects(
            profile, projectsById, {}, {}
        )).toEqual([]);
    });

    it("returns an empty array when there are no matching ProjectProfiles for the profile", () => {
        expect(ProjectProfile.mapProfileToProjects(
            profile, projectsById, {}, {}
        )).toEqual([]);
    });
});
