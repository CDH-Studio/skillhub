import React from "react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import connect from "./connect";

const ProjectDetails = ({project}) => {
    console.log(project);
    return <ProjectDetailsLayout project={project} />;
};
//const {match:{params}}= this.props;

export default connect(ProjectDetails);