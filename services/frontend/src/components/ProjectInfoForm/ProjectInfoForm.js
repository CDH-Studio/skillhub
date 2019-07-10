import React from "react";
import {TextField} from "@material-ui/core";
import "./ProjectInfoForm.scss";

const ProjectInfoForm = ({
    name, description
}) => {
    return (
        <form className="project-info-form">
            <TextField
                autoFocus={true}
                margin="dense"
                id="name"
                label="Name"
                {...name}
            />
            <TextField
                margin="dense"
                id="description"
                label="Description"
                multiline={true}
                {...description}
            />
        </form>
    );
};

export default ProjectInfoForm;