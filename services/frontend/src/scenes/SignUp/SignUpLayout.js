import React from "react";
import TextField from "@material-ui/core/TextField";
import {Logo} from "assets/icons";
import "./SignUp.scss";

const SignUpLayout = () => (
    <div className="signup">
        <SignUpForm />
        <SignUpBranding />
    </div>
);

const SignUpForm = () => (
    <div className="signup-form">
        <div className="signup-form-card">
            <h3 className="signup-form-title">SIGN UP</h3>

            <TextField
                className="signup-form-email"
                label="Email"
            />

            <TextField
                className="signup-form-password"
                label="Password"
            />

            <button className="signup-form-submit">SIGN UP</button>
        </div>
    </div>
);

const SignUpBranding = () => (
    <div className="signup-branding">
        <div className="signup-branding-container">
            <Logo className="signup-branding-logo" />
            <h1 className="signup-branding-name">SKILLHUB</h1>
        </div>
    </div>
);

export default SignUpLayout;
