import React, {useCallback, useState} from "react";
import connect from "./connect";
import {sortObjectsByProperty} from "utils/helperFunctions";
import {FILTER_PROFILES, searchRecords, Query} from "utils/searchGlobals";
import SearchLayout from "./SearchLayout";

const Search = ({createProject, projects, profiles, isLoading}) => {
    /* create the state for the profile/projects filter and the search properties.
     * search properties are set as an object of the form:
     * {searchTerm: , SearchBy: } */
    const [activeFilter, setActiveFilter] = useState(FILTER_PROFILES);
    const [searchProperties, setSearchProperties] = useState(new Query());
    const onFilterClick = useCallback((filter) => () => setActiveFilter(filter), [setActiveFilter]);

    const searchedProjects = searchRecords(
        projects,
        searchProperties.searchTerm,
        searchProperties.searchBy
    );

    const searchedProfiles = searchRecords(
        profiles,
        searchProperties.searchTerm,
        searchProperties.searchBy
    );

    return (
        <SearchLayout
            isLoading={isLoading}
            projects={sortObjectsByProperty(searchedProjects, "name")}
            profiles={sortObjectsByProperty(searchedProfiles, "name")}
            setSearchProperties={setSearchProperties}
            searchId={searchProperties.id}
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
            createProject={createProject}
        />
    );
};

export default connect(Search);
