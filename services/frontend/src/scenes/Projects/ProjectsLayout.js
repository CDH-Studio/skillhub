import React, {useMemo} from "react";
import classNames from "classnames";
import {FilterHeader, ProjectCard} from "components/";
import {Project} from "utils/models";
import "./Projects.scss";

const ProjectsLayout = ({projects, activeFilter, onFilterClick}) => (
    <div className="projects">
        <FilterHeader
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
            labels={[Project.FILTER_ALL, Project.FILTER_ACTIVE, Project.FILTER_ALL]}
        />

        <ProjectsList
            projects={projects}
        />
    </div>
);

const ProjectsHeader = ({activeFilter, onFilterClick}) => (
    <div className="projects-header">
        <FilterButton
            label="All"
            isActive={activeFilter === Project.FILTER_ALL}
            onClick={onFilterClick(Project.FILTER_ALL)}
        />

        <FilterButton
            label="Active"
            isActive={activeFilter === Project.FILTER_ACTIVE}
            onClick={onFilterClick(Project.FILTER_ACTIVE)}
        />

        <FilterButton
            label="Inactive"
            isActive={activeFilter === Project.FILTER_INACTIVE}
            onClick={onFilterClick(Project.FILTER_INACTIVE)}
        />
    </div>
);

const FilterButton = ({label, isActive = false, onClick}) => (
    <button
        className={classNames(
            "filter-button",
            {"filter-button--active": isActive}
        )}
        onClick={onClick}
    >
        {label}
    </button>
);

const ProjectsList = ({projects}) => {
    const projectCards = useMemo(() => projects.map((project) => (
        <ProjectCard
            className="projects-list-card"
            key={project.id}
            isActive={Project.isActive(project)}
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
