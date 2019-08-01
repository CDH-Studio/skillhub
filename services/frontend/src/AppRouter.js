import React from "react";
import {Switch, Route} from "react-router";
import {Profile, ProjectDetails, Projects, Search} from "scenes/";
import ScreenUrls from "utils/screenUrls";
import {Navbar, PopupNotifier} from "components/";
import {SnackbarProvider} from "notistack";

const AppRouter = () => (
    <>
        <Navbar />
        <SnackbarProvider>
            <PopupNotifier />
            <Switch>
                <Route path={ScreenUrls.PROFILE} component={Profile} />
                <Route path={ScreenUrls.PEOPLE_DETAILS} component={Profile} />
                <Route path={ScreenUrls.PROJECT_DETAILS} component={ProjectDetails} />
                <Route path={ScreenUrls.PROJECTS} component={Projects} />
                <Route path={ScreenUrls.SEARCH} component={Search} />
            </Switch>
        </SnackbarProvider>
    </>
);

export default AppRouter;
