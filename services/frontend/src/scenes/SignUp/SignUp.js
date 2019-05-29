import React, {useCallback} from "react";
import {useInput, useOnEnterKey} from "utils/hooks";
import connect from "./connect";
import SignUpLayout from "./SignUpLayout";

const SignUp = ({errorMessage, isEmailInvalid, isLoading, onSignUp}) => {
    const emailInput = useInput();
    const passwordInput = useInput();

    const {value: email} = emailInput;
    const {value: password} = passwordInput;

    const onSignUpClick = useCallback(() => onSignUp(email, password), [email, password, onSignUp]);
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

export default connect(SignUp);
