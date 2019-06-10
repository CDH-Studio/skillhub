import {createSelector} from "redux-starter-kit";
import {profilesSlice, projectsSlice, projectProfilesSlice, skillsSlice, userSlice} from "./slices";
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
    (profile, projectProfilesByProfileId, projectProfilesById, projects) => {
        if (profile && profile.id in projectProfilesByProfileId) {
            const projectProfiles = projectProfilesByProfileId[profile.id].map((id) => projectProfilesById[id]);

            const userProjects = projectProfiles.reduce((acc, {projectId}) => {
                if (projectId in projects) {
                    acc = [...acc, projects[projectId]];
                }

                return acc;
            }, []);

            return userProjects;
        } else {
            return [];
        }
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
