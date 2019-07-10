import React from "react";
import {useInput} from "utils/hooks";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {ProjectInfoForm} from "components/";
import "./ProjectInfoDialog.scss";

const ProjectInfoDialog = ({project, closeDialog, open}) => {
    const formFieldData = {
        "name": {
            ...useInput(project.name)
        },
        "description": {
            ...useInput(project.description)
        },
    };

    return (
        <Dialog className="project-info-dialog"
            open={open}
            onClick={closeDialog}
        >
            <DialogTitle className="project-info-dialog-title">
                Edit Project Info
            </DialogTitle>
            <DialogContent>
                <ProjectInfoForm {...formFieldData} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={closeDialog} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectInfoDialog;