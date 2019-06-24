import React, {useCallback, useMemo, useState} from "react";
import PeopleLayout from "./PeopleLayout";
import connect from "./connect";

// const [activeFilter, setActiveFilter] = useState("all");
// const onFilterClick = useCallback((filter) => () => setActiveFilter(filter), [setActiveFilter]);

//const filteredProjects = useMemo(() => Project.filterProjects(projects, activeFilter), [projects, activeFilter]);
const People = (profiles) => {
    return <PeopleLayout profiles={profiles.profiles} />;
};

export default connect(People);
