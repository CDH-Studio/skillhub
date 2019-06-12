import {createMatchSelector} from "connected-react-router";
import {createSelector} from "redux-starter-kit";
import {reduceToObject} from "utils/helperFunctions";
import {Profile, Project, ProjectProfile} from "utils/models";
import ScreenUrls from "utils/screenUrls";
import {profilesSlice, projectsSlice, projectProfilesSlice, skillsSlice, userSlice} from "./slices";

const getProjectsWithSkills = createSelector(
    [projectsSlice.selectors.getProjects, skillsSlice.selectors.getSkills],
    Project.mergeWithSkills
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
    (projectsWithSkills) => projectsWithSkills.reduce(reduceToObject(), {})
);

const getProfileForUser = createSelector(
    [userSlice.selectors.getUserId, profilesSlice.selectors.getProfiles],
    Profile.findByUserId
);

const getProjectsForUser = createSelector(
    [
        getProfileForUser,
        getProjectsWithSkillsById,
        projectProfilesSlice.selectors.getById,
        projectProfilesSlice.selectors.getByProfileId
    ],
    (profile, projectsById, projectProfilesById, projectProfilesByProfileId) => {
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
