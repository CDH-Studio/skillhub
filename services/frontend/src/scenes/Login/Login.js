import React from "react";
import connect from "./connect";
import LoginLayout from "./LoginLayout";

const Login = ({errorMessage, isInvalidEmail, isLoading, onLogin}) => (
    <LoginLayout
        errorMessage={errorMessage}
        isEmailInvalid={isInvalidEmail}
        isLoading={isLoading}
        onLogin={onLogin}
    />
);

export default connect(Login);
