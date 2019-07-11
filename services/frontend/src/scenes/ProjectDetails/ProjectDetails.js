import React from "react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import connect from "./connect";

<<<<<<< HEAD
const ProjectDetails = ({project, contributors, isLoading}) => (
    <ProjectDetailsLayout project={project} contributors={sortContributors(contributors)} isLoading={isLoading} />
);
=======
const ProjectDetails = ({
    contributors = [], isLoading = false, projectInfoRequest = {},
    project = {}, submitProjectInfo
}) => {
    projectInfoRequest.submitProjectInfo = submitProjectInfo;
    return (
        <ProjectDetailsLayout
            isLoading={isLoading}
            contributors={contributors}
            project={project}
            projectInfoRequest={projectInfoRequest}
        />
    );
};
>>>>>>> b2908fd... CDHSH-99 Added frontend code to patch database and redux store

const sortContributors = (contributors) => contributors.sort((a, b) => a.name.localeCompare(b.name));

export default connect(ProjectDetails);