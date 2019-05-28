import React from "react";
import { Logo } from "assets/icons";
import { Button, Tabs, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";
import ScreenUrls from "utils/screenUrls";
import "./Navbar.scss";

const NavbarLayout = () => {
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className="navbar">
            <a className="navbar-brand" href="/">
                <Logo className="logo-icon" />
            </a>
            <Tabs className="navbar-links" value={value} onChange={handleChange}>
                <Tab to={ScreenUrls.PROFILE} component={Link} label="My Profile" />
                <Tab to={ScreenUrls.PEOPLE} component={Link} label="People" />
                <Tab to={ScreenUrls.PEOPLE} component={Link} label="Projects" />
            </Tabs>

            <div className="navbar-controls">
                <Button className="navbar-search">Search</Button>
                <Button className="navbar-tools">tools</Button>
            </div>
        </div>
    );
};

export default NavbarLayout;
