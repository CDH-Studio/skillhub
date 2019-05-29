import React from "react";
import {Switch, Route} from "react-router";
import {Profile, People} from "scenes/";
import ScreenUrls from "utils/screenUrls";
import {Navbar} from "components/";

// TODO: Protect the AppRouter from unauthenticated users. Will be done as part of CDHSH-3.
const AppRouter = () => (
    <>
        <Navbar />
        <Switch>
            <Route path={ScreenUrls.PROFILE} component={Profile} />
            <Route path={ScreenUrls.PEOPLE} component={People} />
            <Route path={ScreenUrls.PROJECTS} component={Profile} />
        </Switch>
    </>
);

export default AppRouter;
