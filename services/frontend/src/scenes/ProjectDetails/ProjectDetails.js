import React from "react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import connect from "./connect";

const ProjectDetails = ({project, projectProfiles}) => {
    console.log(projectProfiles);
    return (<ProjectDetailsLayout project={project} />);
};

export default connect(ProjectDetails);