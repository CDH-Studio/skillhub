import React from "react";
import {useInput} from "utils/hooks";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {DetailsForm} from "components/";
import "./PersonalDetailsDialog.scss";

const PersonalDetailsDialog = ({profile, handleClose, open}) => {
    const formFieldData = {
        "nameInput": {
            ...useInput(profile.name),
            id: "name",
            label: "Name",
            autoFocus: true
        },
        "emailInput": {
            ...useInput(profile.contactEmail),
            id: "contactEmail",
            label: "Contact Email"
        },
        "roleInput": {
            ...useInput(profile.primaryRole),
            id: "role",
            label: "Primary Role"
        },
        "phoneInput": {
            ...useInput(profile.phone),
            id: "phone",
            label: "Phone Number"
        },
        "slackInput": {
            ...useInput(profile.slackHandle),
            id: "slackHandle",
            label: "Slack Handle"
        },
        "rocketChatInput": {
            ...useInput(profile.rocketChatHandle),
            id: "rocketChatHandle",
            label: "Rocket Chat Handle"
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
                <DetailsForm {...formFieldData} />
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