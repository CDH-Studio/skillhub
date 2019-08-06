import React from "react";
import ProjectDetailsLayout from "./ProjectDetailsLayout";
import {sortObjectsByProperty} from "utils/helperFunctions";
import connect from "./connect";

const ProjectDetails = ({
    contributors = [], isLoading = false, project = {}, projectChangeRecords = [], users = []
}) => (
    <ProjectDetailsLayout
        isLoading={isLoading}
        contributors={
            sortObjectsByProperty(contributors, "name")
        }
        project={project}
        projectChangeRecords={
            sortObjectsByProperty(projectChangeRecords, "createdAt").reverse()
        }
        users={users}
    />
);

export default connect(ProjectDetails);