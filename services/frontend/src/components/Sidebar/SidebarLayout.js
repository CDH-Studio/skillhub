import React from "react";
import Scrollspy from "react-scrollspy";
import "./Sidebar.scss";

const SidebarLayout = ({sections, children, containerClass}) => {
    return (
        <div className="sidebar">
            <Scrollspy
                className="scroll-nav"
                rootEl={containerClass}
                items={sections}
                currentClassName="is-current"
            >
                {
                    children
                }
            </Scrollspy>
        </div>
    );
};

export default SidebarLayout;