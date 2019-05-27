import React from "react";
import {Logo} from "assets/icons";
import { Button, Tabs, Tab } from '@material-ui/core'
import "./Navbar.scss";

const NavbarLayout = () => {
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className="navbar">
            <div className="navbar-header">
                <a href="/">
                    <Logo className="logo-icon" />
                </a>

                <Tabs value={value} onChange={handleChange}>
                        <a href="/profile"><Tab label="Profile"/></a>
                        <a href=""><Tab label="People" /></a>
                        <Tab label="Projects" />
                </Tabs> 

                <div className="navbar-controls">
                    <Button className="navbar-search">ff</Button>
                    <Button className="navbar-tools">SIGN UP</Button>
                </div>
            </div>
        </div>
    );
};

export default NavbarLayout;
