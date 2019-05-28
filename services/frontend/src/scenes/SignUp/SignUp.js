import React, {useCallback, useState} from "react";
import {useInput, useOnEnterKey} from "utils/hooks";
import api from "api/";
import SignUpLayout from "./SignUpLayout";

const EMAIL_REGEX = /^\S+@\S+$/;

const errorMessageMap = {
    "Validation error": "This user already exists",
    "Missing credentials": "Form cannot be empty"
};

const validateUserInfo = (email, password) => {
    if (!email || !password) {
        throw new Error("Missing credentials");
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new Error("Invalid email");
    }
};

const onSignUp = async (email, password, setErrorMessage, setInvalidEmail, setIsLoading) => {
    const clearInfoState = () => {
        setIsLoading(false);
        setErrorMessage("");
        setInvalidEmail(false);
    };

    try {
        validateUserInfo(email, password);
        clearInfoState();  // So that the user doesn't see old errors while waiting for the request
        setIsLoading(true);

        await api.service("users").create({email, password});

        clearInfoState();
    } catch (error) {
        const {message} = error;

        clearInfoState();

        if (message in errorMessageMap) {
            setErrorMessage(errorMessageMap[message]);
        } else if (message === "Invalid email") {
            setInvalidEmail(true);
        } else {
            setErrorMessage(message);
        }
    }
};

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const emailInput = useInput();
    const passwordInput = useInput();

    const {value: email} = emailInput;
    const {value: password} = passwordInput;

    const onSignUpClick = useCallback(
        async () => onSignUp(email, password, setErrorMessage, setInvalidEmail, setIsLoading),
        [email, password, setErrorMessage, setInvalidEmail, setIsLoading]
    );

    const onInputEnter = useCallback(useOnEnterKey(onSignUpClick), [onSignUpClick]);

    return (
        <SignUpLayout
            emailInput={emailInput}
            passwordInput={passwordInput}
            isLoading={isLoading}
            errorMessage={errorMessage}
            invalidEmail={invalidEmail}
            onSignUpClick={onSignUpClick}
            onInputEnter={onInputEnter}
        />
    );
};

export default SignUp;
