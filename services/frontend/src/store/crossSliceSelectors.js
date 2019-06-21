import {createMatchSelector} from "connected-react-router";
import {createSelector} from "redux-starter-kit";
import {arrayToObject} from "utils/helperFunctions";
import {Profile, Project, ProjectProfile} from "utils/models";
import ScreenUrls from "utils/screenUrls";
import {profilesSlice, projectsSlice, projectProfilesSlice, skillsSlice, userSlice} from "./slices";

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

const getUserProfile = createSelector(
    [profilesSlice.selectors.getProfiles, userSlice.selectors.getUserId],
    Profile.getUserProfile
);

const getProjectProfileIdsFromProjectId = createSelector(
    [projectProfilesSlice.selectors.getByProjectId, getProjectIdFromUrl],
    (projectProfilesByProjectId, projectId) => projectProfilesByProjectId[projectId]
);

const getProjectProfilesFromProjectProfileIds = createSelector(
    [getProjectProfileIdsFromProjectId, projectProfilesSlice.selectors.getById],
    (projectProfileIds, projectProfilesById) => (projectProfileIds.map((projectProfileId) => {
        return (projectProfilesById[projectProfileId]);
    }))
);

const getContributorsForProject = createSelector(
    [profilesSlice.selectors.getProfiles, getProjectProfilesFromProjectProfileIds],
    Project.getContributors
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
    getProjectsWithSkills,
    getProjectsWithSkillsById,
    getProjectIdFromUrl,
    getProjectFromUrlId,
    getUserProfile,
    getProjectsForUser,
    getContributorsForProject
};
