import React from "react";
import {Logo} from "assets/icons";
import "./Landing.scss";

const LandingLayout = () => (
    <div className="landing">
        <div className="landing-header">
            <Logo className="logo-icon" />

            <div className="landing-auth">
                <button className="landing-login">LOGIN</button>
                <button className="landing-signup">SIGN UP</button>
            </div>
        </div>

        <div className="landing-jumbotron">
            <h1 className="landing-tagline">WELCOME TO SKILLHUB!</h1>
            <button className="landing-create-profile">CREATE YOUR PROFILE</button>
        </div>
    </div>
);

export default LandingLayout;
