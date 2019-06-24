import React, {useMemo} from "react";
import "./People.scss";
import {ProfileCard} from "components/";
import classNames from "classnames";
import {ProjectCard} from "../Projects/ProjectsLayout";

const PeopleLayout = ({profiles}) => {
    console.log(profiles);
    return (
        <div className={"people"}>
            <PeopleHeader />
        </div>
    );
};

const PeopleHeader = () => (
    <div className="people-header">
        <FilterButton
            label="All"
            isActive={true}
            onClick={true}
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

const PeopleList = ({people}) => {
    const peopleCards = useMemo(() => people.map((person) => (
        <ProfileCard
            className="projects-list-card"
            key={person.name}
            {...person}
        />
    )), [people]);
};

export default PeopleLayout;
