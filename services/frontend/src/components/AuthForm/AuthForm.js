import React, {useCallback} from "react";
import {useInput, useOnEnterKey} from "utils/hooks";
import classNames from "classnames";
import {Card, CardContent, TextField} from "@material-ui/core";
import {EmailInput, FormError, LoadingButton} from "components/";
import "./AuthForm.scss";

const AuthForm = ({className, title, errorMessage, isLoading, isEmailInvalid, onSubmit}) => {
    const emailInput = useInput();
    const passwordInput = useInput();

    const {value: email} = emailInput;
    const {value: password} = passwordInput;

    const onSubmitClick = useCallback(() => onSubmit(email, password), [email, password, onSubmit]);
    const onInputEnter = useCallback(useOnEnterKey(onSubmitClick), [onSubmitClick]);

    return (
        <Card className={classNames("auth-form", className)}>
            <CardContent className="auth-form-card-content">
                <h3 className="auth-form-title">{title}</h3>

                <FormError message={errorMessage} />

                <EmailInput
                    className="auth-form-email"
                    invalid={isEmailInvalid}
                    onKeyPress={onInputEnter}
                    {...emailInput}
                />

                <TextField
                    className="auth-form-password"
                    label="Password"
                    type="password"
                    onKeyPress={onInputEnter}
                    {...passwordInput}
                />

                <LoadingButton
                    className="auth-form-submit"
                    color="primary"
                    variant="contained"
                    loading={isLoading}
                    onClick={onSubmitClick}
                >
                    {title}
                </LoadingButton>
            </CardContent>
        </Card>
    );
};

export default AuthForm;
