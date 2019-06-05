import React from "react";
import NavSidebarLayout from "./NavSidebarLayout";

const NavSidebar = ({scrollSpySelectors, containerClass}) => (
    <NavSidebarLayout
        containerClass={containerClass}
        scrollSpySelectors={scrollSpySelectors.map((scrollSpyItem) => scrollSpyItem.selector)}
    >
        {
            scrollSpySelectors.map((scrollSpyItem, index) => (
                <li className="list-item" key={index}>
                    <a href={"#" + scrollSpyItem.selector}>{scrollSpyItem.name}</a>
                </li>
            ))
        }
    </NavSidebarLayout>
);

export default NavSidebar;