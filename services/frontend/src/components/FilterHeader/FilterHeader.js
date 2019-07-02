import React from "react";
import classNames from "classnames";
import "./FilterHeader.scss";

const FilterHeader = ({activeFilter, onFilterClick, labels}) => {
    const filterButtons = labels.map((label) => (
        <FilterButton
            key={label}
            label={label}
            isActive={activeFilter === label}
            onClick={onFilterClick(label)}
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
        {label.charAt(0).toUpperCase() + label.slice(1)}
    </button>
);

export default FilterHeader;