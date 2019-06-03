import React from "react";
import classNames from "classnames";
import "./Projects.scss";

const ProjectsLayout = ({activeFilter, onFilterClick}) => (
    <div className="projects-list">
        <ProjectsHeader
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
        />
    </div>
);

const ProjectsHeader = ({activeFilter, onFilterClick}) => (
    <div className="projects-header">
        <FilterButton
            label="All"
            isActive={activeFilter === "all"}
            onClick={onFilterClick("all")}
        />

        <FilterButton
            label="Recently Active"
            isActive={activeFilter === "recentlyActive"}
            onClick={onFilterClick("recentlyActive")}
        />

        <FilterButton
            label="Inactive"
            isActive={activeFilter === "inactive"}
            onClick={onFilterClick("inactive")}
        />
    </div>
);

const FilterButton = ({label, isActive = false, onClick}) => (
    <button
        className={classNames(
            "filter-button",
            {"filter-button--active": isActive}
        )}
        variant="contained"
        color="primary"
        onClick={onClick}
    >
        {label}
    </button>
);

export default ProjectsLayout;
