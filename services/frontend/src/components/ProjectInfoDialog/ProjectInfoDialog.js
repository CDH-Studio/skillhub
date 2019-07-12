import React from "react";
import {useInput} from "utils/hooks";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {DetailsForm} from "components/";
import "./ProjectInfoDialog.scss";

const ProjectInfoDialog = ({project, closeDialog, open}) => {
    const formFieldData = {
        "nameInput": {
            ...useInput(project.name),
            id: "name",
            label: "Name",
            autoFocus: true
        },
        "descriptionInput": {
            ...useInput(project.description),
            id: "description",
            label: "Description",
            multiline: true
        },
    };

    return (
        <Dialog className="project-info-dialog"
            open={open}
            onClose={closeDialog}
        >
            <DialogTitle className="project-info-dialog-title">
                Edit Project Info
            </DialogTitle>
            <DialogContent>
                <DetailsForm {...formFieldData} />
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