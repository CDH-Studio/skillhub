import React, {useCallback} from "react";
import {useInput} from "utils/hooks";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {PersonalDetailsForm} from "components/";
import "./PersonalDetailsDialog.scss";

const PersonalDetailsDialog = ({profile, handleClose, open, onSubmit, error}) => {
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
    const {value: name} = formFieldData.nameInput;
    const {value: email} = formFieldData.emailInput;
    const {value: role} = formFieldData.roleInput;
    const {value: phone} = formFieldData.phoneInput;
    const {value: slack} = formFieldData.slackInput;
    const {value: rocketChat} = formFieldData.rocketChatInput;

    const onSubmitClick = useCallback(() => onSubmit(
        profile.id, name, email, role, phone, slack, rocketChat
    ), [
        profile.id, name, email, role, phone, slack, rocketChat, onSubmit
    ]);

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
                {error ? <h1>{error}</h1> : null}
                <PersonalDetailsForm
                    {...formFieldData}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {onSubmitClick();}} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonalDetailsDialog;