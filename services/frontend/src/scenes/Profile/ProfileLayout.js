import React from "react";
import { Button, Tabs, Tab } from '@material-ui/core'
import "./Profile.scss";

const ProfileLayout = () => {
    return (
        <div className="profile">
            <div className="profile-jumbotron">
                <h1 className="profile-tagline">WELCOME TO SKILLHUB!</h1>
                <button className="profile-create-profile">CREATE YOUR PROFILE</button>
            </div>
        </div>
    );
};

export default ProfileLayout;
