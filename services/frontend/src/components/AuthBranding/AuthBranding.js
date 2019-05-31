import React from "react";
import {Link} from "react-router-dom";
import {Logo} from "assets/icons";
import ScreenUrls from "utils/screenUrls";
import "./AuthBranding.scss";

const AuthBranding = () => (
    <div className="auth-branding">
        <Link to={ScreenUrls.LANDING}>
            <div className="auth-branding-container">
                <Logo className="auth-branding-logo" />
                <h1 className="auth-branding-name">SKILLHUB</h1>
            </div>
        </Link>
    </div>
);

export default AuthBranding;
