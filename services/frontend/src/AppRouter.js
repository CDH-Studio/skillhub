import React from "react";
import {Switch, Route} from "react-router";
import {People, Profile, ProjectDetails, Projects} from "scenes/";
import ScreenUrls from "utils/screenUrls";
import {Navbar} from "components/";

const AppRouter = () => (
    <>
        <Navbar />
        <Switch>
            <Route path={ScreenUrls.PROFILE} component={Profile} />
            <Route path={ScreenUrls.PEOPLE} component={People} />
            <Route path={ScreenUrls.PROJECT_DETAILS} component={ProjectDetails} />
            <Route path={ScreenUrls.PROJECTS} component={Projects} />
        </Switch>
    </>
);

export default AppRouter;
