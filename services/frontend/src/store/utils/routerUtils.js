import {CALL_HISTORY_METHOD, LOCATION_CHANGE} from "connected-react-router";
import ScreenUrls from "utils/screenUrls";

export const routerActionTypes = [CALL_HISTORY_METHOD, LOCATION_CHANGE];

const isRouteBlacklisted = (route, routesBlacklist) => (
    routesBlacklist.reduce((acc, blacklistRoute) => (
        acc || route.startsWith(blacklistRoute)
    ), false)
);

const tryingToAccessRoutes = (payload, routesBlacklist = []) => {
    // 'location' is for LOCATION_CHANGE type actions
    // 'args' is for CALL_HISTORY_METHOD type actions
    // See https://github.com/supasate/connected-react-router/blob/master/src/actions.js for reference
    const {location, args} = payload;

    if (location) {
        return isRouteBlacklisted(location.pathname, routesBlacklist);
    } else if (args) {
        // For some reason, args is an array, where the first element is supposedly the path payload.
        // But, we're not taking any chances here, so we reduce over the whole array.
        return args.reduce((acc, arg) => acc || isRouteBlacklisted(arg, routesBlacklist), false);
    } else {
        return false;
    }
};

export const tryingToAccessApp = (payload) => tryingToAccessRoutes(payload, [ScreenUrls.APP_ROUTER]);
export const tryingToAccessAuth = (payload) => tryingToAccessRoutes(payload, [ScreenUrls.LOGIN, ScreenUrls.SIGN_UP]);
