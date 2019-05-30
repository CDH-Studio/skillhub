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

    return combineReducers(reducers);
};

export default createRootReducer;
