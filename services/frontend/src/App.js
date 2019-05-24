import React from "react";
import {Provider} from "react-redux";
import {Switch, Route} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import {Landing, Profile, SignUp} from "scenes/";
import configureStore, {history} from "store/";
import ScreenUrls from "utils/screenUrls";
import "./App.scss";

const store = configureStore();

const AppLayout = () => (
    <div id="app">
        <Switch>
            <Route path={ScreenUrls.PROFILE} component={Profile} />
            <Route path={ScreenUrls.SIGN_UP} component={SignUp} />
            <Route path={ScreenUrls.LANDING} component={Landing} />
        </Switch>
    </div>
);

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppLayout />
        </ConnectedRouter>
    </Provider>
);

export default App;
