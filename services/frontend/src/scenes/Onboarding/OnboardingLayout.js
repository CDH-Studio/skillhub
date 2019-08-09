import React, {useCallback} from "react";
import {useInput} from "utils/hooks";
import {DetailsForm, LoadingButton} from "components/";
import {Card, CardHeader, CardContent, CardActions} from "@material-ui/core";
import uuidv4 from "uuid/v4";
import "./Onboarding.scss";

const OnboardingLayout = ({user, error, isLoading, onSubmit}) => (
    <div className="onboarding">
        <div className="auth-branding">
        </div>
        <div className="onboarding-content">
            <OnboardingForm
                formTitle="Create your Profile"
                user={user}
                onSubmit={onSubmit}
                error={error}
                isLoading={isLoading}
            />
        </div>
    </div>
);

const OnboardingForm = ({user, onSubmit, isLoading, error}) => {
    console.log(user)
    const formFieldData = {
        "nameInput": {
            ...useInput(),
            id: "name",
            label: "Name",
            autoFocus: true
        },
        "roleInput": {
            ...useInput(),
            id: "primaryRole",
            label: "Primary Role"
        },
        "phoneInput": {
            ...useInput(),
            id: "phone",
            label: "Phone Number"
        },
        "slackInput": {
            ...useInput(),
            id: "slackHandle",
            label: "Slack Handle"
        },
        "rocketChatInput": {
            ...useInput(),
            id: "rocketChatHandle",
            label: "Rocket Chat Handle"
        }
    };

    const {value: name} = formFieldData.nameInput;
    const {value: role} = formFieldData.roleInput;
    const {value: phone} = formFieldData.phoneInput;
    const {value: slack} = formFieldData.slackInput;
    const {value: rocketChat} = formFieldData.rocketChatInput;

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
    const onSubmitClick = useCallback(() => onSubmit(
        uuidv4(), user.id, name, user.email, role, phone, slack, rocketChat
    ), [
        name, user, role, phone, slack, rocketChat, onSubmit
    ]);

    return (
        <Card className="onboarding-form">
            <CardHeader
                className="onboarding-form-header"
                title="Create your Profile"
            />
            <CardContent
                className="onboarding-form-content"
            >
                <DetailsForm
                    formFieldData={formFieldData}
                />
            </CardContent>
            <CardActions
                className="onboarding-form-actions"
            >
                <LoadingButton
                    className="onboarding-form-submit"
                    color="primary"
                    variant="contained"
                    onClick={onSubmitClick}
                    loading={isLoading}
                >
                    Submit
                </LoadingButton>
            </CardActions>
        </Card>
    );
};

export default OnboardingLayout;
