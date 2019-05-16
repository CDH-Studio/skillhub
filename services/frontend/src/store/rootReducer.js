import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import mounts from "./mountpoints";

const createRootReducer = (history) => combineReducers({
    [mounts.router]: connectRouter(history)
});

export default createRootReducer;
