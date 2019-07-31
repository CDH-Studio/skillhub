import React, {useMemo, useState} from "react";
import {useInput} from "utils/hooks";
import {Paper, IconButton, MenuItem, Input, Select} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import {ProfileCard, ProjectCard} from "components/";
import {Project} from "utils/models";
import {FILTER_PROFILES, FILTER_PROJECTS} from "utils/searchGlobals";
import "./Search.scss";

const CARDS_PER_PAGE = 10;

const currencies = [
    {
        value: 'BTC',
        label: 'name',
    },
    {
        value: 'JPY',
        label: 'skill',
    },
];

const SearchLayout = ({projects, profiles, activeFilter, onFilterClick, setSearchProperties, searchTerm}) => {
    console.log(FILTER_PROFILES);
    return (
        <div className="search">
            <SearchField
                setSearchProperties={setSearchProperties}
            />
            <FilterHeader
                labels={[FILTER_PROFILES, FILTER_PROJECTS]}
                onFilterClick={onFilterClick}
                activeFilter={activeFilter}
            />

            <FilteredContent
                key={searchTerm}
                profiles={profiles}
                projects={projects}
                activeFilter={activeFilter}
            />
        </div>
    );
};

const FilteredContent = ({activeFilter, profiles, projects}) => {
    const [paginatedProjects, setPaginatedProjects] = useState(projects.slice(0,CARDS_PER_PAGE));
    const [paginatedProfiles, setPaginatedProfiles] = useState(profiles.slice(0,CARDS_PER_PAGE));

    if (activeFilter === FILTER_PROJECTS) {
        return (
            <>
                <div className="something">
                    <ProjectsList
                        projects={paginatedProjects}
                    />
                </div>
                <PaginationFooter
                    data={projects}
                    setData={setPaginatedProjects}
                />
            </>
        );
    }
    else if (activeFilter === FILTER_PROFILES) {
        return (
            <>
                <div className="something">
                    <ProfilesList profiles={paginatedProfiles} />
                </div>
                <PaginationFooter
                    data={profiles}
                    setData={setPaginatedProfiles}
                />
            </>
        );
    }
};

const PaginationFooter = ({data, setData}) => (
    <div className="pagin">
        <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            pageCount={Math.ceil(data.length / CARDS_PER_PAGE)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(newPageIndex) => {
                handlePageChange(newPageIndex.selected, setData, data);
            }}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
        />
    </div>
);

const handlePageChange = (newPageIndex, setData, cards) => {
    setData(cards.slice(
        newPageIndex * CARDS_PER_PAGE,
        newPageIndex * CARDS_PER_PAGE + CARDS_PER_PAGE
    ));
};

const ProjectsList = ({projects}) => (
    useMemo(() => projects.map((project) => (
        <ProjectCard
            className="projects-list-card"
            key={project.id}
            isActive={Project.isActive(project)}
            {...project}
        />
    )), [projects])
);

const ProfilesList = ({profiles}) => (
    useMemo(() => profiles.map((profile) => (
        <Paper
            className="search-page-card"
            key={profile.name}
        >
            <ProfileCard
                page="people"
                {...profile}
            />
        </Paper>
    )), [profiles])
);

const SearchField = ({setSearchProperties}) => {
    const searchInput = useInput();
    const {value: searchTerm} = searchInput;

    const [values, setValues] = React.useState({
        currency: "BTC"
    });

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };
    return (
        <div className="search-input">
            <Paper className="search-box">
                <Input
                    placeholder="Search..."
                    disableUnderline={true}
                    type="search"
                    className=""
                    {...searchInput}
                />
                <Select
                    label="Select"
                    className="input-base"
                    value={values.currency}
                    onChange={handleChange('currency')}
                    disableUnderline={true}
                    SelectProps={{
                        MenuProps: {
                        },
                    }}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                    }
                </Select>
                <IconButton
                    className="search-icon"
                    onClick={() => setSearchProperties({
                        searchTerm: searchTerm,
                        searchBy: values.currency
                    })}
                >
                    <Search />
                </IconButton >
            </Paper>
        </div>
    );
};

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

export default SearchLayout;
