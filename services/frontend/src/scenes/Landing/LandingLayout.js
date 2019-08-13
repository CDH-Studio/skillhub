import React from "react";
import {Link} from "react-router-dom";
import {Logo} from "assets/icons";
import ScreenUrls from "utils/screenUrls";
import "./Landing.scss";

const LandingLayout = () => (
    <div className="landing">
        <div className="landing-header">
            <Logo className="logo-icon" />

            <div className="landing-auth">
                <Link className="landing-login" to={ScreenUrls.LOGIN}>LOGIN</Link>
                <Link className="landing-signup" to={ScreenUrls.SIGN_UP}>SIGN UP</Link>
            </div>
        </div>

        <div className="landing-content">
            <div className="landing-jumbotron">
                <h1 className="landing-tagline">Skills Tracking for Enterprise</h1>
                <Link className="landing-create-profile" to={ScreenUrls.SIGN_UP}>
                    CREATE YOUR PROFILE
                </Link>
            </div>
        </div>
    </div>
);

export default LandingLayout;
