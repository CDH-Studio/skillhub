import React from "react";
import connect from "./connect";
import NavbarLayout from "./NavbarLayout";

const Navbar = ({onLogout}) => (
    <NavbarLayout onLogout={onLogout} />
);

export default connect(Navbar);
