import React from "react";
import Scrollspy from "react-scrollspy";
import "./NavSidebar.scss";

const NavSidebarLayout = ({scrollSpySelectors, children, containerClass}) => {
    return (
        <div className="sidebar">
            <Scrollspy
                className="scroll-nav"
                rootEl={containerClass}
                items={scrollSpySelectors}
                currentClassName="is-current"
            >
                {children}
            </Scrollspy>
        </div>
    );
};

export default NavSidebarLayout;