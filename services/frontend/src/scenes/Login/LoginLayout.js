import React from "react";
import {AuthBranding, AuthForm} from "components/";
import "./Login.scss";

const LoginLayout = ({errorMessage, isEmailInvalid, isLoading, onLogin}) => (
    <div className="login">
        <div className="login-form">
            <AuthForm
                title="LOGIN"
                errorMessage={errorMessage}
                isEmailInvalid={isEmailInvalid}
                isLoading={isLoading}
                onSubmit={onLogin}
            />
        </div>

        <AuthBranding />
    </div>
);

export default LoginLayout;
