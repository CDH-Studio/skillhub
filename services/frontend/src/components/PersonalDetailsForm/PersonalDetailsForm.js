import React from "react";
import {TextField} from "@material-ui/core";
import "./PersonalDetailsForm.scss";

const PersonalDetailsForm = ({
    nameInput, emailInput, roleInput, phoneInput, slackInput, rocketChatInput
}) => {
    return (
        <form className="personal-details-form">
            <TextField
                autoFocus={true}
                margin="dense"
                id="name"
                label="Name"
                {...nameInput}
            />
            <TextField
                margin="dense"
                id="contactEmail"
                label="Contact E-mail"
                type="email"
                {...emailInput}
            />
            <TextField
                margin="dense"
                id="primaryRole"
                label="Primary Role"
                {...roleInput}
            />
            <TextField
                margin="dense"
                id="phone"
                label="Phone Number"
                type="tel"
                {...phoneInput}
            />
            <TextField
                margin="dense"
                id="slackHandle"
                label="Slack Handle"
                {...slackInput}
            />
            <TextField
                margin="dense"
                id="rocketChatHandle"
                label="Rocket Chat Handle"
                {...rocketChatInput}
            />
        </form>
    );
};

export default PersonalDetailsForm;