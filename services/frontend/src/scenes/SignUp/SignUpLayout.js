import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import {Logo} from "assets/icons";
import ScreenUrls from "utils/screenUrls";
import "./SignUp.scss";

const SignUpLayout = ({emailInput, passwordInput, onSignUpClick}) => (
    <div className="signup">
        <SignUpForm
            emailInput={emailInput}
            passwordInput={passwordInput}
            onSignUpClick={onSignUpClick}
        />

        <SignUpBranding />
    </div>
);

const SignUpForm = ({emailInput, passwordInput, onSignUpClick}) => (
    <div className="signup-form">
        <Card>
            <CardContent className="signup-form-card-content">
                <h3 className="signup-form-title">SIGN UP</h3>

                <TextField
                    className="signup-form-email"
                    label="Email"
                    {...emailInput}
                />

                <TextField
                    className="signup-form-password"
                    label="Password"
                    type="password"
                    {...passwordInput}
                />

                <Button
                    className="signup-form-submit"
                    color="primary"
                    variant="contained"
                    onClick={onSignUpClick}
                >
                    SIGN UP
                </Button>
            </CardContent>
        </Card>
    </div>
);

const SignUpBranding = () => (
    <div className="signup-branding">
        <Link to={ScreenUrls.LANDING}>
            <div className="signup-branding-container">
                <Logo className="signup-branding-logo" />
                <h1 className="signup-branding-name">SKILLHUB</h1>
            </div>
        </Link>
    </div>
);

export default SignUpLayout;
