import React from "react";
import ChipInput from "material-ui-chip-input";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import "./EditSkillsDialog.scss";

const EditSkillsDialog = ({skills, handleClose, open}) => {
    return (
        <Dialog className="edit-skills-dialog"
            aria-labelledby="edit-skills-dialog-title"
            open={open}
            onClose={handleCancel}
        >
            <DialogTitle id="edit-skills-dialog-title">
                Edit Personal Details
            </DialogTitle>
            <DialogContent>
                <MuiThemeProvider>
                    <ChipInput
                        defaultValue={skills}
                        onChange={(chips) => handleChange(chips)}
                    />
                </MuiThemeProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleSubmit(currentChips)} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSkillsDialog;