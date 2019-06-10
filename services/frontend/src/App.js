import React from "react";
import {ConnectedRouter} from "connected-react-router";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {Switch, Route} from "react-router";
import {Landing, Login, SignUp} from "scenes/";
import configureStore, {history} from "store/";
import ScreenUrls from "utils/screenUrls";
import AppRouter from "./AppRouter";
import "./App.scss";

const {store, persistor} = configureStore();

const theme = createMuiTheme({
    palette: {
        // These colors must match the ones defined in 'styles/_color.scss'.
        primary: {
            light: "#BBDEFB",
            main: "#2196F3",
            dark: "#1565C0"
        },
        secondary: {
            light: "#B2DFDB",
            main: "#009688",
            dark: "#00695C"
        },
        error: {
            light: "#FFBDB",
            main: "#E12D39",
            dark: "#610316"
        }
    }
});

const AppLayout = () => (
    <div id="app">
        <Switch>
            <Route path={ScreenUrls.APP_ROUTER} component={AppRouter} />
            <Route path={ScreenUrls.LOGIN} component={Login} />
            <Route path={ScreenUrls.SIGN_UP} component={SignUp} />
            <Route path={ScreenUrls.LANDING} component={Landing} />
        </Switch>
    </div>
);

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <AppLayout />
                </ThemeProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
);

export default App;
