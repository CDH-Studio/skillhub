import React, {useCallback, useMemo, useState} from "react";
import {FILTER_PROFILES, FILTER_PROJECTS, SEARCH_OPTIONS, Query} from "utils/searchGlobals";
import {useInput, useOnEnterKey} from "utils/hooks";
import {Project} from "utils/models";
import {CreateProjectDialog, ProfileCard, ProjectCard, LoadingValidator} from "components/";
import {CircularProgress, Paper, Fab, IconButton, MenuItem, Input, Select} from "@material-ui/core";
import {Add, Search} from "@material-ui/icons";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import "./Search.scss";

const CARDS_PER_PAGE = 10;

const handlePageChange = (newPageIndex, setData, cards) => {
    setData(cards.slice(
        newPageIndex * CARDS_PER_PAGE,
        newPageIndex * CARDS_PER_PAGE + CARDS_PER_PAGE
    ));
};

const SearchLayout = ({
    createProject, activeFilter, projects, profiles, dependency, onFilterClick,
    setSearchProperties, searchId, isLoading
}) => {
    const [createProjectDialogOpen, setProjectDialogOpen] = useState(false);

    const openDialog = () => {
        setProjectDialogOpen(true);
    };

    const closeDialog = () => {
        setProjectDialogOpen(false);
    };
    const handleSubmit = (project) => {
        createProject(project);
        closeDialog();
    };

    const handleCancel = () => {
        closeDialog();
    };

    return (
        <div className="search">
            <CreateProjectDialog
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                open={createProjectDialogOpen}
            />
            <div className="search-create-row">
                <div className="column" />
                <div className="column">
                    <SearchField
                        setSearchProperties={setSearchProperties}
                    />
                </div>
                <div className="column">
                    <div className="create-project-button" onClick={openDialog}>
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                        >
                            <Add className="create-project-button-add-icon" />
                            Create Project
                        </Fab>
                    </div>
                </div>
            </div>
            <FilterHeader
                labels={[FILTER_PROFILES, FILTER_PROJECTS]}
                onFilterClick={onFilterClick}
                activeFilter={activeFilter}
            />
            <LoadingValidator
                dependencies={[dependency]}
                isLoading={isLoading}
                renderOnLoad={
                    <FilteredContent
                        key={searchId}
                        profiles={profiles}
                        projects={projects}
                        activeFilter={activeFilter}
                    />
                }
                renderOnFailedLoad={
                    <CircularProgress className="loading-indicator" />
                }
            />
        </div>
    );
};

const FilteredContent = ({activeFilter, profiles, projects}) => {
    const [paginatedProjects, setPaginatedProjects] = useState(projects.slice(0, CARDS_PER_PAGE));
    const [paginatedProfiles, setPaginatedProfiles] = useState(profiles.slice(0, CARDS_PER_PAGE));

    if (activeFilter === FILTER_PROJECTS) {
        return (
            <>
                <div className="list-container">
                    <ProjectsList
                        projects={paginatedProjects}
                    />
                    <br className="list-container-flex-padding" />
                </div>
                <PaginationFooter
                    data={projects}
                    setData={setPaginatedProjects}
                />
            </>
        );
    } else if (activeFilter === FILTER_PROFILES) {
        return (
            <>
                <div className="list-container">
                    <ProfilesList
                        profiles={paginatedProfiles}
                    />
                    <br className="list-container-flex-padding" />
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
    <div className="pagination-container">
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(data.length / CARDS_PER_PAGE)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(newPageIndex) => {
                handlePageChange(newPageIndex.selected, setData, data);
            }}
            containerClassName={"paginator"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
        />
    </div>
);

const ProjectsList = ({projects}) => {
    const mappedProjects = useMemo(() => projects.map((project) => (
        <ProjectCard
            className="projects-list-card"
            key={project.id}
            isActive={Project.isActive(project)}
            {...project}
        />
    )), [projects]);

    return (mappedProjects.length === 0) ? (
        <EmptyContent />
    ) : (
        mappedProjects
    );
};

const ProfilesList = ({profiles}) => {

    const mappedProfiles = useMemo(() => profiles.map((profile) => (
        <Paper
            className="profile-list-card"
            key={profile.id}
        >
            <ProfileCard
                page="people"
                {...profile}
            />
        </Paper>
    )), [profiles]);

    return (mappedProfiles.length === 0) ? (
        <EmptyContent />
    ) : (
        mappedProfiles
    );
};

const EmptyContent = () => (
    <Paper className="empty-search">
        <h2 className="empty-search-heading">
            Content Not Found
        </h2>
    </Paper>
);

const SearchField = ({setSearchProperties}) => {
    // Create the controlled search input and state to hold the type of search (ex. by name)
    const searchInput = useInput();
    const {value: searchTerm} = searchInput;
    const [searchOption, setSearchOption] = React.useState(SEARCH_OPTIONS[0]);

    const handleChange = (event) => {
        setSearchOption(event.target.value);
    };

    /* Create a new query containing all of the required data for the search and set it in State
     * to begin the search */
    const onSearch = () => (
        setSearchProperties(new Query({
            searchBy: searchOption.toLowerCase(),
            searchTerm: searchTerm
        }))
    );
    const onInputEnter = useCallback(useOnEnterKey(onSearch), [onSearch]);

    return (
        <div className="search-input">
            <Paper className="search-box">
                <Input
                    placeholder="Search..."
                    disableUnderline={true}
                    type="search"
                    onKeyPress={onInputEnter}
                    {...searchInput}
                />
                <Select
                    label="Select"
                    className="input-base"
                    value={searchOption}
                    onChange={handleChange}
                    disableUnderline={true}
                >
                    {SEARCH_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))
                    }
                </Select>
                <IconButton
                    className="search-icon"
                    onClick={onSearch}
                >
                    <Search />
                </IconButton>
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
