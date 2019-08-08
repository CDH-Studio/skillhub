import React, {useCallback} from "react";
import {useInput} from "utils/hooks";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import "./RoleInputDialog.scss";

const RoleInputDialog = ({
    closeDialog, currentProject, dialogTitle, error, open, profile, onSubmit
}) => {

    //Generate the role fields dynamic attributes
    const roleInput = useInput();
    if (error) {
        roleInput.error = true;
        roleInput.helperText = error.data;
    }
    const {value: role} = roleInput;

    // Attach the 'profile' and 'role' to create projectProfile association
    if (currentProject) {
        currentProject.role = role;
        currentProject.profile = profile;
    }

    const onSubmitClick = useCallback(() => onSubmit(
        currentProject
    ), [
        currentProject, onSubmit
    ]);

    return (
        <Dialog
            className="role-input-dialog"
            open={open}
            onClose={closeDialog}
            fullWidth={true}
            maxWidth="xs"
        >
            <div className="role-input-dialog-header">
                <DialogTitle className="project-dialog-title">
                    {dialogTitle}
                </DialogTitle>
            </div>
            <DialogContent
                className="role-input-dialog-content"
                dividers={true}
            >
                <TextField
                    className="role-input-dialog-field"
                    margin="dense"
                    id="role"
                    label="Role"
                    autoFocus={true}
                    {...roleInput}
                />
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

export default RoleInputDialog;