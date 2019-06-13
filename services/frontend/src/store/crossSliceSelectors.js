import {createSelector} from "redux-starter-kit";
import {profilesSlice, projectsSlice, skillsSlice, userSlice} from "./slices";
import {Profile, Project} from "utils/models";
import {createMatchSelector} from "connected-react-router";
import ScreenUrls from "utils/screenUrls";

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

export const crossSliceSelectors = {
    getProjectsWithSkills,
    getProjectIdFromUrl,
    getProjectFromUrlId,
    getUserProfile
};
