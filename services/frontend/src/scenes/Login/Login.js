import React from "react";
import connect from "./connect";
import LoginLayout from "./LoginLayout";

const Login = ({errorMessage, isEmailInvalid, isLoading, onLogin}) => (
    <LoginLayout
        errorMessage={errorMessage}
        isLoading={isLoading}
        isEmailInvalid={isEmailInvalid}
        onLogin={onLogin}
    />
);

export default connect(Login);
