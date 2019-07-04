import React from "react";
import {TextField} from "@material-ui/core";
import "./PersonalDetailsForm.scss";

const PersonalDetailsForm = ({
    name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle
}) => {
    return (
        <form className="personal-details-form">
            <TextField
                autoFocus={true}
                margin="dense"
                id="name"
                label="Name"
                {...name}
            />
            <TextField
                margin="dense"
                id="contactEmail"
                label="Contact E-mail"
                type="email"
                {...contactEmail}
            />
            <TextField
                margin="dense"
                id="primaryRole"
                label="Primary Role"
                {...primaryRole}
            />
            <TextField
                margin="dense"
                id="phone"
                label="Phone Number"
                type="tel"
                {...phone}
            />
            <TextField
                margin="dense"
                id="slackHandle"
                label="Slack Handle"
                {...slackHandle}
            />
            <TextField
                margin="dense"
                id="rocketChatHandle"
                label="Rocket Chat Handle"
                {...rocketChatHandle}
            />
        </form>
    );
};

export default PersonalDetailsForm;