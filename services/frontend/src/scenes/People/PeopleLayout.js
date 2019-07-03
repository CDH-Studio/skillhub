import React from "react";
import {Paper} from "@material-ui/core";
import "./People.scss";
import {FilterHeader, ProfileCard} from "components/";

const sortProfiles = (profiles) => profiles.sort((a, b) => a.name.localeCompare(b.name));

const PeopleLayout = ({profiles, activeFilter, onFilterClick}) => (
    <div className="people">
        <FilterHeader
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
            labels={["all"]}
        />
        <PeopleList people={sortProfiles(profiles)} />
    </div>
);

const PeopleList = ({people}) => {
    const peopleCards = people.map((person) => (
        <Paper className="people-page-card" key={person.name}>
            <ProfileCard
                page="people"
                {...person}
            />
        </Paper>
    ));
    return (
        <div className={"people-list"}>
            {peopleCards}
        </div>
    );
};

export default PeopleLayout;
