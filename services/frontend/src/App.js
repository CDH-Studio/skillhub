import React from "react";
import {Provider} from "react-redux";
import {Switch, Route} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import {Landing, Profile} from "scenes/";
import configureStore, {history} from "store/";
import "./App.scss";

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppLayout />
        </ConnectedRouter>
    </Provider>
);

const AppLayout = () => (
    <div id="app">
        <Switch>
            <Route
                path="/profile"
                render={() => (
                    <Profile />
                )}
            />
            <Route
                path="/"
                render={() => (
                    <Landing />
                )}
            />
        </Switch>
    </div>
);

export default App;
