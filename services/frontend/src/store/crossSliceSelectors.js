import {createMatchSelector} from "connected-react-router";
import {createSelector} from "redux-starter-kit";
import ScreenUrls from "utils/screenUrls";
import {Profile, Project, ProjectProfile} from "utils/models";
import {profilesSlice, projectsSlice, projectProfilesSlice, skillsSlice, userSlice} from "./slices";

const getProjectsWithSkills = createSelector(
    [projectsSlice.selectors.getProjects, skillsSlice.selectors.getSkills],
    (projectsById, skillsById) => Project.mergeWithSkills(projectsById, skillsById)
);

const getProjectIdFromUrl = createSelector(
    [createMatchSelector(ScreenUrls.PROJECT_DETAILS)],
    (match) => match.params.id
);

const getProjectFromUrlId = createSelector(
    [projectsSlice.selectors.getProjects, getProjectIdFromUrl],
    (projectsById, projectId) => projectsById[projectId]
);

const getUserProfile = createSelector(
    [profilesSlice.selectors.getProfiles, userSlice.selectors.getUserId],
    (profilesById, userId) => Profile.getUserProfile(profilesById, userId)
);

const getProjectsWithSkillsById = createSelector(
    [getProjectsWithSkills],
    (projectsWithSkills) => projectsWithSkills.reduce((acc, project) => {
        acc[project.id] = project;
        return acc;
    }, {})
);

const getProfileForUser = createSelector(
    [userSlice.selectors.getUserId, profilesSlice.selectors.getProfiles],
    (userId, profiles) => Object.values(profiles).filter((profile) => profile.userId === userId)[0]
);

const getProjectsForUser = createSelector(
    [
        getProfileForUser,
        projectProfilesSlice.selectors.getByProfileId,
        projectProfilesSlice.selectors.getById,
        getProjectsWithSkillsById
    ],
    (profile, projectProfilesByProfileId, projectProfilesById, projectsById) => {
        if (!profile || !(profile.id in projectProfilesByProfileId)) {
            return [];
        }

        const projectProfiles = ProjectProfile.mapProfileIdToProjectProfiles(
            profile.id, projectProfilesById, projectProfilesByProfileId
        );

        return ProjectProfile.mapProjectProfilesToProjects(projectProfiles, projectsById);
    }
);

export const crossSliceSelectors = {
    getProjectsWithSkills,
    getProjectIdFromUrl,
    getProjectFromUrlId,
    getUserProfile,
    getProfileForUser,
    getProjectsForUser
};
