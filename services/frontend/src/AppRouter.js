import React from "react";
import {Switch, Route} from "react-router";
import {People, Profile, ProjectDetails, Projects} from "scenes/";
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
                <Route path={ScreenUrls.PEOPLE} component={People} />
                <Route path={ScreenUrls.PROJECT_DETAILS} component={ProjectDetails} />
                <Route path={ScreenUrls.PROJECTS} component={Projects} />
            </Switch>
        </SnackbarProvider>
    </>
);

export default AppRouter;
