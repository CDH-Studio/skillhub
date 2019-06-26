import React from "react";
import "./People.scss";
import {ProfileCard} from "components/";
import classNames from "classnames";
import {ProjectCard} from "../Projects/ProjectsLayout";

const PeopleLayout = ({profiles}) => {
    console.log(profiles);
    return (
        <div className={"people"}>
            <PeopleHeader />
            <PeopleList people={sortProfiles(profiles)} />
        </div>
    );
};

const sortProfiles = (profiles) => profiles.sort((a, b) => a.name.localeCompare(b.name));
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
    const peopleCards = people.map((person) => (
        <ProfileCard
            className="people-list-card"
            key={person.name}
            {...person}
        />
    ));
    return peopleCards;
};

const dummypeople = [
    {
        id: "f293a510-7477-4f48-857d-a59bcd16c9c4",
        name: "Abc",
        primaryRole: "software",
        contactEmail:"asvsdc@asdads.com",
        phone: "890890890",
        skills: [
            {name: "abc"},
            {name: "def"}
        ]
    },
    {
        id: "f293a510-7477-4f48-857d-a59bcd16c9c4",
        name: "Abc",
        primaryRole: "software",
        contactEmail:"asvsdc@asdads.com",
        phone: "890890890",
        skills: [
            {name: "abc"},
            {name: "dsef"},
            {name: "ddef"},
            {name: "deff"},
            {name: "defg"},
            {name: "dehf"},
            {name: "detf"}
        ]
    },
    {
        id: "f293a510-7477-4f48-857d-a59bcd16c9c4",
        name: "Abc",
        primaryRole: "software",
        contactEmail:"asvsdc@asdads.com",
        phone: "890890890",
        skills: [
            {name: "abc"},
            {name: "def"}
        ]
    },
    {
        name: "Abc",
        primaryRole: "software",
        contactEmail:"asvsdc@asdads.com",
        phone: "890890890",
        skills: [
            {name: "abc"},
            {name: "def"}
        ]
    },
    {
        name: "Abc",
        primaryRole: "software",
        contactEmail:"asvsdc@asdads.com",
        phone: "890890890",
        skills: [
            {name: "abc"},
            {name: "def"}
        ]
    }
];

export default PeopleLayout;
