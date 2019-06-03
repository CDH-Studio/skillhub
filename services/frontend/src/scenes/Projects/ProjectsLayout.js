import React from "react";
import classNames from "classnames";
import "./Projects.scss";

const ProjectsLayout = () => (
    <div>
        <ProjectsFilters />
    </div>
);

const ProjectsFilters = () => (
    <div className="projects-filters">
        <FilterButton label="All" />
        <FilterButton label="Recently Active" />
        <FilterButton label="Inactive" />
    </div>
);

const FilterButton = ({label, isActive = false}) => (
    <button 
        className={classNames(
            "filter-button", 
            {"filter-button--active": isActive}
        )}
        variant="contained" 
        color="primary"
    >
        {label}
    </button>
);


export default ProjectsLayout;
