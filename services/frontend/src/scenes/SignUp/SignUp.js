import React, {useCallback} from "react";
import {useInput} from "utils/hooks";
import api from "api/";
import SignUpLayout from "./SignUpLayout";

const SignUp = () => {
    const emailInput = useInput();
    const passwordInput = useInput();

    const onSignUpClick = useCallback(async () => {
        try {
            await api.service("users").create({email: emailInput.value, password: passwordInput.value});
        } catch (e) {
            console.log(e);
        }
    }, [emailInput, passwordInput]);

    return (
        <SignUpLayout
            emailInput={emailInput}
            passwordInput={passwordInput}
            onSignUpClick={onSignUpClick}
        />
    );
};

export default SignUp;
