import {createSelector} from "redux-starter-kit";
import {projectsSlice, skillsSlice} from "./slices";

const getProjectsWithSkills = createSelector(
    [projectsSlice.selectors.getProjects, skillsSlice.selectors.getSkills],
    (projects, skills) => (
        Object.keys(projects).map((projectId) => {
            const project = {...projects[projectId]};
            project.skills = project.skills.map((skillId) => skills[skillId].name);
            return project;
        })
    )
);

export const crossSliceSelectors = {
    getProjectsWithSkills
};
