import React from "react";
import {useInput} from "utils/hooks";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {PersonalDetailsForm} from "components/";
import "./PersonalDetailsDialog.scss";

const PersonalDetailsDialog = ({profile, handleClose, open}) => {
    const formFieldData = {
        "nameInput": {
            ...useInput(profile.name)
        },
        "emailInput": {
            ...useInput(profile.contactEmail)
        },
        "roleInput": {
            ...useInput(profile.primaryRole)
        },
        "phoneInput": {
            ...useInput(profile.phone)
        },
        "slackInput": {
            ...useInput(profile.slackHandle)
        },
        "rocketChatInput": {
            ...useInput(profile.rocketChatHandle)
        }
    };

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
                <PersonalDetailsForm {...formFieldData} />
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

export default PersonalDetailsDialog;