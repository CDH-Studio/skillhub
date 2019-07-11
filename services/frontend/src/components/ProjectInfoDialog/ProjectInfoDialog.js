import React, {useCallback} from "react";
import {useInput} from "utils/hooks";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {DetailsForm} from "components/";
import "./ProjectInfoDialog.scss";

const ProjectInfoDialog = ({project, closeDialog, open, onSubmit}) => {
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

    const {value: name} = formFieldData.nameInput;
    const {value: description} = formFieldData.descriptionInput;

    const onSubmitClick = useCallback(() => onSubmit(
        project.id, name, description
    ), [
        project.id, name, description, onSubmit
    ]);

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
                <Button onClick={onSubmitClick} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectInfoDialog;