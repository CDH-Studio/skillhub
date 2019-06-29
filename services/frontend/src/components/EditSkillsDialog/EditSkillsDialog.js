import React from "react";
import ChipInput from "material-ui-chip-input";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import "./EditSkillsDialog.scss";


const EditSkillsDialog = ({skills, handleClose, open}) => {
    return (
        <Dialog className="personal-details-dialog"
            aria-labelledby="personal-details-dialog-title"
            open={open}
            onClose={handleClose}
        >
            <DialogTitle id="personal-details-dialog-title">
                Edit Personal Details
            </DialogTitle>
            <DialogContent>
                <MuiThemeProvider>
                    <ChipInput
                        defaultValue={skills}
                    />
                </MuiThemeProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSkillsDialog;