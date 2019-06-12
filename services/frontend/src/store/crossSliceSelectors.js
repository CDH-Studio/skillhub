import {createSelector} from "redux-starter-kit";
import {projectsSlice, skillsSlice} from "./slices";
import {createMatchSelector} from "connected-react-router";
import ScreenUrls from "utils/screenUrls";
import {Project} from "utils/models";

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

export const crossSliceSelectors = {
    getProjectsWithSkills,
    getProjectIdFromUrl,
    getProjectFromUrlId
};
