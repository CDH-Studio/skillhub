import React from "react";
import {Switch, Route} from "react-router";
import {Profile, People, ProjectDetails} from "scenes/";
import ScreenUrls from "utils/screenUrls";
import {Navbar} from "components/";

const AppRouter = () => (
    <>
        <Navbar />
        <Switch>
            <Route path={ScreenUrls.PROFILE} component={Profile} />
            <Route path={ScreenUrls.PEOPLE} component={People} />
            <Route path={ScreenUrls.PROJECTS} component={ProjectDetails} />
        </Switch>
    </>
);

export default AppRouter;
