import {createSelector} from "redux-starter-kit";
import {projectsSlice, skillsSlice} from "./slices";
import {Project} from "utils/models";

const getProjectsWithSkills = createSelector(
    [projectsSlice.selectors.getProjects, skillsSlice.selectors.getSkills],
    (projectsById, skillsById) => Project.mergeWithSkills(projectsById, skillsById)
);

export const crossSliceSelectors = {
    getProjectsWithSkills
};
