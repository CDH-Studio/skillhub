import React from "react";
import {AuthBranding, AuthForm} from "components/";
import "./SignUp.scss";

const SignUpLayout = ({errorMessage, isEmailInvalid, isLoading, onSignUp}) => (
    <div className="signup">
        <div className="signup-form">
            <AuthForm
                title="SIGN UP"
                errorMessage={errorMessage}
                isEmailInvalid={isEmailInvalid}
                isLoading={isLoading}
                onSubmit={onSignUp}
            />
        </div>

        <AuthBranding />
    </div>
);

export default SignUpLayout;
