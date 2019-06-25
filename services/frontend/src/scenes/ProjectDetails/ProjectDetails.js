import React from "react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import connect from "./connect";

const ProjectDetails = ({project, contributors, isLoading}) => (
    <ProjectDetailsLayout project={project} contributors={contributors} isLoading={isLoading} />
);

export default connect(ProjectDetails);