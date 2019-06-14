import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import mounts from "./mountpoints";
import * as slices from "./slices";

const createRootReducer = (history) => {
    const reducers = Object.keys(slices).reduce((acc, key) => {
        const {slice: mountpoint, reducer} = slices[key];
        acc[mountpoint] = reducer;

        return acc;
    }, {
        [mounts.router]: connectRouter(history)}
    );

    const appReducer = combineReducers(reducers);

    const rootReducer = (state, action) => {
        // Reset all store state (except for the router) when user logs in or out
        if (
            action.type === slices.authRequestsSlice.login.actions.request.toString()
            || action.type === slices.authRequestsSlice.logout.actions.request.toString()
        ) {
            state = {[mounts.router]: state[mounts.router]};
        }

        return appReducer(state, action);
    };

    return rootReducer;
};

export default createRootReducer;
