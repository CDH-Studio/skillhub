import React from "react";
import connect from "./connect";
import SignUpLayout from "./SignUpLayout";

const SignUp = ({errorMessage, isEmailInvalid, isLoading, onSignUp}) => (
    <SignUpLayout
        errorMessage={errorMessage}
        isLoading={isLoading}
        isEmailInvalid={isEmailInvalid}
        onSignUp={onSignUp}
    />
);

export default connect(SignUp);
