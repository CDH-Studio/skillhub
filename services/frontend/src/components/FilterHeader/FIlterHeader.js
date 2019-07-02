import React from "react";
import classNames from "classnames";
import "./FilterHeader.scss";

const FilterHeader = ({activeFilter, onFilterClick, labels}) => {
    const filterButtons = labels.map((label) => (
        <FilterButton
            key={{label}}
            label={label}
            isActive={activeFilter}
            onClick={onFilterClick}
        />
    ));
    return (
        <div className="filter-header">
            {filterButtons}
        </div>
    );
};

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

const PeopleHeader = ({activeFilter, onFilterClick}) => (
    <div className="people-header">
        <FilterButton
            label="All"
            isActive={activeFilter}
            onClick={onFilterClick}
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

export default FilterHeader;