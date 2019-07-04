import React from "react";
import connect from "./connect";
import LoginLayout from "./LoginLayout";

const errorMessageMap = (error) => {
    if (error) {
        const message = error.message;
        if (message === "Validation error") {
            return "This user already exists";
        } else if (message === "Missing credentials") {
            return "Form cannot be empty";
        } else if (message === "Invalid email") {
            return "Invalid Email";
        } else {
            return message;
        }
    }
};

const checkInvalidEmail = (error) => {
    if (error && error.message === "Invalid email") {
        return true;
    }
};

const Login = ({error, isLoading, onLogin}) => (
    <LoginLayout
        errorMessage={errorMessageMap(error)}
        isEmailInvalid={checkInvalidEmail(error)}
        isLoading={isLoading}
        onLogin={onLogin}
    />
);

export default connect(Login);
