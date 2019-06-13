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
    [projectsSlice.selectors.getProjects, getProjectIdFromUrl],
    (projectsById, projectId) => projectsById[projectId]
);

const getUserProfile = createSelector(
    [profilesSlice.selectors.getProfiles, userSlice.selectors.getUserId],
    Profile.getUserProfile
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
    getProjectsForUser
};
