import React from "react";
import {Logo} from "assets/icons";
import "./Profile.scss";

const ProfileLayout = () => {
    return (
        <div className="profile">
            <div className="profile-header">
                <a href="/">
                    <Logo className="logo-icon" />
                </a>

                <div className="profile-controls">
                    <button className="profile-search">ff</button>
                    <button className="profile-tools">SIGN UP</button>
                </div>
            </div>

            <div className="profile-jumbotron">
                <h1 className="profile-tagline">WELCOME TO SKILLHUB!</h1>
                <button className="profile-create-profile">CREATE YOUR PROFILE</button>
            </div>
        </div>
    );
};

export default ProfileLayout;
