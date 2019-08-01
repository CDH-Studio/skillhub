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
            <IconButton className="logo-link" to={ScreenUrls.PROFILE} component={Link}>
                <Logo className="logo-icon" />
            </IconButton>
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
        <Tab to={ScreenUrls.SEARCH} component={Link} label="Search" />
        <Tab to={ScreenUrls.PROFILE} component={Link} label="Profile" />
        <Tab to={ScreenUrls.PROJECTS} component={Link} label="My Projects" />
    </Tabs>
);

const NavbarSearch = () => (
    <Link to={ScreenUrls.SEARCH}>
        <IconButton className="navbar-search">
            <Search />
        </IconButton>
    </Link>
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
