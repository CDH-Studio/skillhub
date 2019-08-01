import React, {useCallback, useState} from "react";
import connect from "./connect";
import {searchRecords} from "utils/helperFunctions";
import {FILTER_PROFILES, Query} from "utils/searchGlobals";
import SearchLayout from "./SearchLayout";

const Search = ({projects, profiles, isLoading}) => {
    /* create the state for the profile/projects filter and the search properties.
     * search properties are set as an object of the form:
     * {searchTerm: , SearchBy: } */
    const [activeFilter, setActiveFilter] = useState(FILTER_PROFILES);
    const [searchProperties, setSearchProperties] = useState(new Query());
    const onFilterClick = useCallback((filter) => () => setActiveFilter(filter), [setActiveFilter]);

    const searchedProjects = searchRecords(projects, searchProperties.searchTerm, searchProperties.searchBy);
    const searchedProfiles = searchRecords(profiles, searchProperties.searchTerm, searchProperties.searchBy);

    return (
        <SearchLayout
            isLoading={isLoading}
            projects={searchedProjects}
            profiles={searchedProfiles}
            setSearchProperties={setSearchProperties}
            searchTerm={searchProperties.searchTerm}
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
        />
    );
};

export default connect(Search);
