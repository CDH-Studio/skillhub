import React from "react";
import SidebarLayout from "./SidebarLayout";

const Sidebar = ({sections, containerClass}) => (
    <SidebarLayout
        containerClass={containerClass}
        sections={
            sections.map((section) => {
                return section.className;
            })
        }
    >
        {
            sections.map((section) =>
                <li className="list-item" key={section.id}>
                    <a href={"#" + section.className}>{section.sectionName}</a>
                </li>
            )
        }
    </SidebarLayout>
);

export default Sidebar;