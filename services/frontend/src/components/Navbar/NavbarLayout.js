import React, {useCallback, useState} from "react";
import {Logo} from "assets/icons";
import {Button, IconButton, Menu, MenuItem, Tabs, Tab} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";
import {Link} from "react-router-dom";
import ScreenUrls from "utils/screenUrls";
import "./Navbar.scss";

const NavbarLayout = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="navbar">
            <div className="navbar-brand">
                <Link to={ScreenUrls.LANDING}>
                    <Logo className="logo-icon" />
                </Link>
            </div>

            <Tabs className="navbar-links" value={value} onChange={handleChange}>
                <Tab to={ScreenUrls.PROFILE} component={Link} label="My Profile" />
                <Tab to={ScreenUrls.PEOPLE} component={Link} label="People" />
                <Tab to={ScreenUrls.PROJECTS} component={Link} label="Projects" />
            </Tabs>

            <div className="navbar-controls">
                <Button className="navbar-search">Search</Button>
                <NavbarMenu />
            </div>
        </div>
    );
};

const NavbarMenu = () => {
    const [anchorElement, setAnchorElement] = useState(null);

    const onClick = useCallback((e) => setAnchorElement(e.target), [setAnchorElement]);
    const onClose = useCallback((e) => setAnchorElement(null), [setAnchorElement]);

    return (
        <>
            <IconButton onClick={onClick}>
                <MoreVert />
            </IconButton>    

            <Menu
                anchorEl={anchorElement}
                open={!!anchorElement}
                onClose={onClose}
            >
                <MenuItem>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default NavbarLayout;
