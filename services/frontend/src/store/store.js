import {routerMiddleware} from "connected-react-router";
import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createBrowserHistory} from "history";
import createRootReducer from "./rootReducer";

export const history = createBrowserHistory({forceRefresh: false});

const configureStore = () => {
    const preloadedState = {};

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middlewares = [thunkMiddleware, routerMiddleware(history)];

    return createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancers(applyMiddleware(...middlewares))
    );
};

export default configureStore;
