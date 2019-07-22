import React from "react";
import connect from "./connect";
import SignUpLayout from "./SignUpLayout";

const SignUp = ({errorMessage, isEmailInvalid, isLoading, onSignUp}) => (
    <SignUpLayout
        errorMessage={errorMessage}
        isEmailInvalid={isEmailInvalid}
        isLoading={isLoading}
        onSignUp={onSignUp}
    />
);

export default connect(SignUp);
