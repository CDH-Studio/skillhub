import {createSelector} from "redux-starter-kit";
import {profilesSlice, projectsSlice, skillsSlice, userSlice} from "./slices";
import {Profile, Project} from "utils/models";

const getProjectsWithSkills = createSelector(
    [projectsSlice.selectors.getProjects, skillsSlice.selectors.getSkills],
    (projectsById, skillsById) => Project.mergeWithSkills(projectsById, skillsById)
);

const getUserProfile = createSelector(
    [profilesSlice.selectors.getProfiles, userSlice.selectors.getUserId],
    (profilesById, userId) => Profile.getUserProfile(profilesById, userId)
);

export const crossSliceSelectors = {
    getProjectsWithSkills,
    getUserProfile
};
