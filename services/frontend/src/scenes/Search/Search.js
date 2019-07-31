import React, {useCallback, useState} from "react";
import connect from "./connect";
import {searchRecords} from "utils/helperFunctions";
import {FILTER_PROFILES} from "utils/searchGlobals";
import SearchLayout from "./SearchLayout";

const Search = ({projects, profiles}) => {
    const [activeFilter, setActiveFilter] = useState(FILTER_PROFILES);
    const [searchProperties, setSearchProperties] = useState({});
    const onFilterClick = useCallback((filter) => () => setActiveFilter(filter), [setActiveFilter]);

    const searchedProjects = searchRecords(projects, searchProperties.searchTerm, searchProperties.searchBy);
    const searchedProfiles = searchRecords(profiles, searchProperties.searchTerm, searchProperties.searchBy);

    return (
        <SearchLayout
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
