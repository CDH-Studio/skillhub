import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField

} from "@material-ui/core";
import "./CreateProjectDialog.scss";

const CreateProjectDialog = ({handleCancel, handleSubmit, open}) => {

    return (
        <Dialog className="create-project-dialog"
            open={open}
            onClose={handleCancel}
        >
            <DialogTitle className="create-project-dialog-title">
                Create Project
            </DialogTitle>
            <DialogContent className="create-project-dialog-content">
                <TextField
                    className="input-field"
                    label="Enter Name"
                />
                <TextField
                    className="input-field"
                    label="Enter Description"
                    multiline={true}
                    rowsMax="4"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProjectDialog;