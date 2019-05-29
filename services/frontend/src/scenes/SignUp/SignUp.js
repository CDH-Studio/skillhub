import React, {useCallback, useState} from "react";
import {useInput, useOnEnterKey} from "utils/hooks";
import api from "api/";
import ScreenUrls from "utils/screenUrls";
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

const onSignUp = async (email, password, setErrorMessage, setIsEmailInvalid, setIsLoading, history) => {
    const clearInfoState = () => {
        setIsLoading(false);
        setErrorMessage("");
        setIsEmailInvalid(false);
    };

    try {
        validateUserInfo(email, password);
        clearInfoState();  // So that the user doesn't see old errors while waiting for the request
        setIsLoading(true);

        await api.service("users").create({email, password});
        await api.authenticate({strategy: "local", email, password});

        history.push(ScreenUrls.PROFILE);
    } catch (error) {
        const {message} = error;

        clearInfoState();

        if (message in errorMessageMap) {
            setErrorMessage(errorMessageMap[message]);
        } else if (message === "Invalid email") {
            setIsEmailInvalid(true);
        } else {
            setErrorMessage(message);
        }
    }
};

const SignUp = ({history}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const emailInput = useInput();
    const passwordInput = useInput();

    const {value: email} = emailInput;
    const {value: password} = passwordInput;

    const onSignUpClick = useCallback(
        async () => onSignUp(email, password, setErrorMessage, setIsEmailInvalid, setIsLoading, history),
        [email, password, setErrorMessage, setIsEmailInvalid, setIsLoading, history]
    );

    const onInputEnter = useCallback(useOnEnterKey(onSignUpClick), [onSignUpClick]);

    return (
        <SignUpLayout
            emailInput={emailInput}
            passwordInput={passwordInput}
            isLoading={isLoading}
            errorMessage={errorMessage}
            isEmailInvalid={isEmailInvalid}
            onSignUpClick={onSignUpClick}
            onInputEnter={onInputEnter}
        />
    );
};

export default SignUp;
