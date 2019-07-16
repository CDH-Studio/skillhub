import React from "react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import connect from "./connect";

const ProjectDetails = ({project, contributors, isLoading}) => (
    <ProjectDetailsLayout project={project} contributors={sortContributors(contributors)} isLoading={isLoading} />
);

const sortContributors = (contributors) => contributors.sort((a, b) => a.name.localeCompare(b.name));

export default connect(ProjectDetails);