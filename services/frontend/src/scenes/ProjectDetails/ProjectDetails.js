import React from "react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import connect from "./connect";

const ProjectDetails = ({contributors = [], isLoading = false, project = {}}) => (
    <ProjectDetailsLayout
        isLoading={isLoading}
        contributors={sortContributors(contributors)}
        project={project}
    />
);

const sortContributors = (contributors) => contributors.sort((a, b) => a.name.localeCompare(b.name));

export default connect(ProjectDetails);