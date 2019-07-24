import React, {useCallback} from "react";
import connect from "./connect";
import {useInput} from "utils/hooks";
import {DetailsDialog, ProfileCard} from "components/";
import {Paper} from "@material-ui/core";

const PersonalDetails = ({
    clearPatchError, error, isUserProfile, open, onSubmit, profile, setDialogState
}) => {
    const openDialog = () => {
        setDialogState("personalDetails", true);
    };

    const closeDialog = () => {
        if (error) {
            clearPatchError();
        }
        setDialogState("personalDetails", false);
    };

    return (
        <>
            <PersonalDetailsDialog
                closeDialog={closeDialog}
                error={error}
                key={open ? profile : error}
                onSubmit={onSubmit}
                open={open}
                profile={profile}
            />
            <Paper className="profile-page-card profile-card-details">
                <div className="profile-card-details-content">
                    <ProfileCard
                        key={profile.id}
                        page={isUserProfile ? "userProfile" : "peopleProfile"}
                        openDialog={openDialog}
                        {...profile}
                    />
                </div>
            </Paper>
        </>
    );
};

const PersonalDetailsDialog = ({closeDialog, error, open, profile, onSubmit}) => {
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
            id: "primaryRole",
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

    const formFieldDataById = Object.values(formFieldData).reduce((acc, formField) => {
        acc[formField.id] = formField;
        return acc;
    }, {});

    /* Set the error property for incorrectly filled in fields */
    if (error && error.message === "Missing Data") {
        for (const invalidFieldIndex of Object.keys(error.data)) {
            formFieldDataById[invalidFieldIndex].error = true;
            formFieldDataById[invalidFieldIndex].helperText = error.data[invalidFieldIndex];
        }
    }

    return (
        <DetailsDialog
            closeDialog={closeDialog}
            dialogTitle="Edit Personal Details"
            formFieldData={formFieldData}
            open={open}
            onSubmit={onSubmitClick}
        />
    );
};

export default connect(PersonalDetails);