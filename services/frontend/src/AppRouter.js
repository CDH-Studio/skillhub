import React from "react";
import {Switch, Route} from "react-router";
import {Profile, People} from "scenes/";
import ScreenUrls from "utils/screenUrls";
import { Navbar } from 'components/'

const AppRouter = () => (
    <div id="app">
        <Navbar/>
        <Switch>
            <Route path={ScreenUrls.PROFILE} component={Profile} />
            <Route path={ScreenUrls.PEOPLE} component={People} />
            <Route path={ScreenUrls.PROFILE} component={Profile} />
        </Switch>
    </div>
);

export default AppRouter