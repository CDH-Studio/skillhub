import React, {useCallback, useState} from "react";
import {IconButton, Menu, MenuItem, Tabs, Tab} from "@material-ui/core";
import {MoreVert, Search} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {Logo} from "assets/icons";
import ScreenUrls from "utils/screenUrls";
import "./Navbar.scss";

const NavbarLayout = ({activeTab, onLogout}) => (
    <div className="navbar">
        <div className="navbar-brand">
            <Link to={ScreenUrls.PROFILE}>
                <Logo className="logo-icon" />
            </Link>
        </div>

        <NavbarTabs activeTab={activeTab} />

        <div className="navbar-controls">
            <NavbarSearch />
            <NavbarMenu onLogout={onLogout} />
        </div>
    </div>
);

const NavbarTabs = ({activeTab = 0}) => (
    <Tabs className="navbar-links" value={activeTab}>
        <Tab to={ScreenUrls.PROFILE} component={Link} label="My Profile" />
        <Tab to={ScreenUrls.PEOPLE} component={Link} label="People" />
        <Tab to={ScreenUrls.PROJECTS} component={Link} label="Projects" />
    </Tabs>
);

const NavbarSearch = () => (
    <IconButton className="navbar-search">
        <Search />
    </IconButton>
);

const NavbarMenu = ({onLogout}) => {
    const [anchorElement, setAnchorElement] = useState(null);

    const onClick = useCallback((e) => setAnchorElement(e.target), [setAnchorElement]);
    const onClose = useCallback(() => setAnchorElement(null), [setAnchorElement]);

    return (
        <div className="navbar-menu">
            <IconButton className="navbar-menu-trigger" onClick={onClick}>
                <MoreVert />
            </IconButton>

            <Menu
                anchorEl={anchorElement}
                open={!!anchorElement}
                onClose={onClose}
            >
                <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default NavbarLayout;
