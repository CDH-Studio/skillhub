import React from "react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import connect from "./connect";

const ProjectDetails = ({project, contributors}) => {
    return (<ProjectDetailsLayout project={project} contributors={contributors} />);
};

export default connect(ProjectDetails);