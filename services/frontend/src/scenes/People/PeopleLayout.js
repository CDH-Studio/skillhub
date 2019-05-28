import React from "react";
import "./People.scss";

const PeopleLayout = () => {
    return (
        <div className="people">
            <div className="people-jumbotron">
                <h1 className="people-tagline">WELCOME TO THE SKILLHUB!</h1>
                <button className="people-create-People">CREATE YOUR ACCOUNT</button>
            </div>
        </div>
    );
};

export default PeopleLayout;
