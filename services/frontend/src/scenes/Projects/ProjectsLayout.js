import React, {useMemo} from "react";
import {FilterHeader, ProjectCard} from "components/";
import {Project} from "utils/models";
import "./Projects.scss";

const ProjectsLayout = ({projects, activeFilter, onFilterClick}) => (
    <div className="projects">
        <FilterHeader
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
            labels={[Project.FILTER_ALL, Project.FILTER_ACTIVE, Project.FILTER_INACTIVE]}
        />

        <ProjectsList
            projects={projects}
        />
    </div>
);

const ProjectsList = ({projects}) => {
    const projectCards = useMemo(() => projects.map((project) => (
        <ProjectCard
            className="projects-list-card"
            key={project.id}
            isActive={Project.isActive(project)}
            showMoreSkills={true}
            {...project}
        />
    )), [projects]);

    return (
        <div className="projects-list">
            {projectCards}
        </div>
    );
};

export default ProjectsLayout;
