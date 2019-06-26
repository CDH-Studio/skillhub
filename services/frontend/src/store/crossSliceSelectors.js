import {createMatchSelector} from "connected-react-router";
import {createSelector} from "redux-starter-kit";
import {arrayToObject} from "utils/helperFunctions";
import {Profile, Project, ProjectProfile} from "utils/models";
import ScreenUrls from "utils/screenUrls";
import {profilesSlice, projectsSlice, projectProfilesSlice, skillsSlice, userSlice, profileSkillsSlice} from "./slices";

const isMatchingRoute = (route) => createSelector(
    [createMatchSelector(route)],
    (match) => match
);

/* Profile Selectors */
const getProfilesWithSkills = createSelector(
    [
        profilesSlice.selectors.getProfiles,
        profileSkillsSlice.selectors.getById,
        profileSkillsSlice.selectors.getByProfileId,
        skillsSlice.selectors.getSkills
    ],
    Profile.mergeProfilesWithSkills
);

const getProfilesWithSkillsById = createSelector(
    [getProfilesWithSkills],
    (profilesWithSkills) => profilesWithSkills.reduce(arrayToObject(), {})
);

const getProfileIdFromUrl = createSelector(
    [createMatchSelector(ScreenUrls.PEOPLE_DETAILS)],
    (match) => match.params.id
);

const getProfileFromUrlId = createSelector(
    [getProfilesWithSkillsById, getProfileIdFromUrl],
    (profilesById, profileId) => profilesById[profileId]
);

const getUserProfile = createSelector(
    [getProfilesWithSkills, userSlice.selectors.getUserId],
    Profile.getUserProfile
);

/* Project Selectors */
const getProjectsWithSkills = createSelector(
    [projectsSlice.selectors.getProjects, skillsSlice.selectors.getSkills],
    Project.mergeWithSkills
);

const getProjectsWithSkillsById = createSelector(
    [getProjectsWithSkills],
    (projectsWithSkills) => projectsWithSkills.reduce(arrayToObject(), {})
);

const getProjectIdFromUrl = createSelector(
    [createMatchSelector(ScreenUrls.PROJECT_DETAILS)],
    (match) => match.params.id
);

const getProjectFromUrlId = createSelector(
    [getProjectsWithSkillsById, getProjectIdFromUrl],
    (projectsById, projectId) => projectsById[projectId]
);

/* Other Selectors */
const getContributorsForProject = createSelector(
    [
        getProjectIdFromUrl,
        projectProfilesSlice.selectors.getByProjectId,
        projectProfilesSlice.selectors.getById,
        profilesSlice.selectors.getProfiles
    ],
    Project.getContributors
);

const getProjectsFromProfileUrlId = createSelector(
    [
        getProfileFromUrlId,
        getProjectsWithSkillsById,
        projectProfilesSlice.selectors.getById,
        projectProfilesSlice.selectors.getByProfileId
    ],
    ProjectProfile.mapProfileToProjects
);

const getProjectsForUser = createSelector(
    [
        getUserProfile,
        getProjectsWithSkillsById,
        projectProfilesSlice.selectors.getById,
        projectProfilesSlice.selectors.getByProfileId
    ],
    ProjectProfile.mapProfileToProjects
);

export const crossSliceSelectors = {
    isMatchingRoute,
    getProfilesWithSkills,
    getProfilesWithSkillsById,
    getProfileIdFromUrl,
    getProfileFromUrlId,
    getUserProfile,
    getProjectsWithSkills,
    getProjectsWithSkillsById,
    getProjectIdFromUrl,
    getProjectFromUrlId,
    getContributorsForProject,
    getProjectsFromProfileUrlId,
    getProjectsForUser
};
