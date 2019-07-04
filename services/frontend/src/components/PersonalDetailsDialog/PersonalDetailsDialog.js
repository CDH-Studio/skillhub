import React, {useCallback} from "react";
import {useInput} from "utils/hooks";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {PersonalDetailsForm} from "components/";
import "./PersonalDetailsDialog.scss";

const PersonalDetailsDialog = ({profile, handleClose, open, onSubmit, error}) => {
    /* setup controlled fields with react hooks */
    const formFieldData = {
        "name": {
            ...useInput(profile.name),
        },
        "contactEmail": {
            ...useInput(profile.contactEmail)
        },
        "primaryRole": {
            ...useInput(profile.primaryRole)
        },
        "phone": {
            ...useInput(profile.phone)
        },
        "slackHandle": {
            ...useInput(profile.slackHandle)
        },
        "rocketChatHandle": {
            ...useInput(profile.rocketChatHandle)
        }
    };

    const {value: name} = formFieldData.name;
    const {value: email} = formFieldData.contactEmail;
    const {value: role} = formFieldData.primaryRole;
    const {value: phone} = formFieldData.phone;
    const {value: slack} = formFieldData.slackHandle;
    const {value: rocketChat} = formFieldData.rocketChatHandle;

    const onSubmitClick = useCallback(() => onSubmit(
        profile.id, name, email, role, phone, slack, rocketChat
    ), [
        profile.id, name, email, role, phone, slack, rocketChat, onSubmit
    ]);

    /* Set the error property for incorrectly filled in fields */
    if (error && error.message === "Missing Data") {
        for (const invalidFieldIndex of Object.keys(error.data)) {
            formFieldData[invalidFieldIndex].error = true;
            formFieldData[invalidFieldIndex].helperText = error.data[invalidFieldIndex];
        }
    }

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
                <PersonalDetailsForm
                    {...formFieldData}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onSubmitClick}
                    color="primary"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonalDetailsDialog;