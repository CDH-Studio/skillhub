import React from "react";
import classNames from "classnames";
import {Button, Card, CardContent, CircularProgress, TextField} from "@material-ui/core";
import {Error} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {Logo} from "assets/icons";
import ScreenUrls from "utils/screenUrls";
import "./SignUp.scss";

const SignUpLayout = (formProps) => (
    <div className="signup">
        <SignUpForm {...formProps} />

        <SignUpBranding />
    </div>
);

const SignUpForm = ({
    emailInput, passwordInput, isLoading, errorMessage, invalidEmail, onSignUpClick, onInputEnter
}) => (
    <div className="signup-form">
        <Card>
            <CardContent className="signup-form-card-content">
                <h3 className="signup-form-title">SIGN UP</h3>

                <FormError message={errorMessage} />

                <EmailInput
                    className="signup-form-email"
                    invalid={invalidEmail}
                    onKeyPress={onInputEnter}
                    {...emailInput}
                />

                <TextField
                    className="signup-form-password"
                    label="Password"
                    type="password"
                    onKeyPress={onInputEnter}
                    {...passwordInput}
                />

                <LoadingButton
                    className="signup-form-submit"
                    color="primary"
                    variant="contained"
                    loading={isLoading}
                    onClick={onSignUpClick}
                >
                    SIGN UP
                </LoadingButton>
            </CardContent>
        </Card>
    </div>
);

const SignUpBranding = () => (
    <div className="signup-branding">
        <Link to={ScreenUrls.LANDING}>
            <div className="signup-branding-container">
                <Logo className="signup-branding-logo" />
                <h1 className="signup-branding-name">SKILLHUB</h1>
            </div>
        </Link>
    </div>
);

const EmailInput = ({className, invalid = false, ...otherProps}) => (
    <TextField
        className={classNames("email-input", className)}
        label="Email"
        error={invalid}
        helperText={invalid ? "Invalid email" : ""}
        {...otherProps}
    />
);

const FormError = ({className, message = ""}) => (
    <div
        className={classNames(
            "form-error",
            {"form-error--visible": message !== ""},
            className
        )}
    >
        <Error color="error" fontSize="small" />
        <p className="form-error-message">{message}</p>
    </div>
);

const LoadingButton = ({className, loading, children, ...otherProps}) => (
    <Button
        className={classNames("loading-button", className)}
        {...otherProps}
    >
        {
            loading ? (
                <CircularProgress className="loading-button-indicator" />
            ) : (
                children
            )
        }
    </Button>
);

export default SignUpLayout;
