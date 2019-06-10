import React from "react";
import connect from "./connect";
import NavbarLayout from "./NavbarLayout";

const Navbar = ({activeTab, onLogout}) => (
    <NavbarLayout
        activeTab={activeTab}
        onLogout={onLogout}
    />
);

export default connect(Navbar);
