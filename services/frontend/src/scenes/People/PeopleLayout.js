import React from "react";
import {Logo} from "assets/icons";
import { Button, Tabs, Tab } from '@material-ui/core'
import "./People.scss";

const PeopleLayout = () => {
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className="people">
            <div className="people-jumbotron">
                <h1 className="people-tagline">WELCOME TO SKILLHUB!</h1>
                <button className="people-create-People">CREATE YOUR ACCOUNT</button>
            </div>
        </div>
    );
};

export default PeopleLayout;
