import React from "react";
import "./People.scss";
import {FilterHeader, ProfileCard} from "components/";

const sortProfiles = (profiles) => profiles.sort((a, b) => a.name.localeCompare(b.name));

const PeopleLayout = ({profiles, activeFilter, onFilterClick}) => (
    <div className="people">
        <FilterHeader
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
            labels={["All"]}
        />
        <PeopleList people={sortProfiles(profiles)} />
    </div>
);

const PeopleList = ({people}) => {
    const peopleCards = people.map((person) => (
        <ProfileCard
            className="people-list-card"
            key={person.name}
            {...person}
        />
    ));
    return peopleCards;
};

export default PeopleLayout;
