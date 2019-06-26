import React, {useCallback, useMemo, useState} from "react";
import {Profile} from "utils/models";
import PeopleLayout from "./PeopleLayout";
import connect from "./connect";

const People = (profiles) => {
    const [activeFilter, setActiveFilter] = useState(Profile.FILTER_ALL);
    const onFilterClick = useCallback((filter) => () => setActiveFilter(filter), [setActiveFilter]);

    const filteredProfiles = useMemo(() =>
        Profile.filterProfiles(profiles.profiles, activeFilter),[profiles, activeFilter]
    );
    return (
        <PeopleLayout
            profiles={filteredProfiles}
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
        />
    );
};

export default connect(People);
