import React from "react";
import {Logo} from "assets/icons";
import "./Profile.scss";
import { Button, Tabs, Tab, Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });

const ProfileLayout = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className="profile">
            <div className="profile-header">
                <Logo className="logo-icon" />

                <div className="Profile-pages classes.root">
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="My Profile" />
                        <Tab label="People" />
                        <Tab label="Projects" />
                    </Tabs> 
                </div>

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
