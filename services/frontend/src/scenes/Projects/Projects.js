import React, {useCallback, useMemo, useState} from "react";
import {Project} from "utils/models";
import connect from "./connect";
import ProjectsLayout from "./ProjectsLayout";

const Projects = ({projects = []}) => {
    const [activeFilter, setActiveFilter] = useState(Project.FILTER_ALL);
    const onFilterClick = useCallback((filter) => () => setActiveFilter(filter), [setActiveFilter]);

    const filteredProjects = useMemo(() => Project.filterProjects(projects, activeFilter), [projects, activeFilter]);

    return (
        <ProjectsLayout
            projects={filteredProjects}
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
        />
    );
};

export default connect(Projects);
