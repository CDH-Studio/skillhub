import {tryingToAccessApp, tryingToAccessAuth} from "./routerUtils";
import ScreenUrls from "utils/screenUrls";

const generateLocationPayload = (route) => ({location: {pathname: route}});
const generateArgsPayload = (route) => ({args: [route]});

const testLocationAndArgsPayloads = (func, route, result) => {
    const locationPayload = generateLocationPayload(route);
    const argsPayload = generateArgsPayload(route);

    expect(func(locationPayload)).toEqual(result);
    expect(func(argsPayload)).toEqual(result);
};

describe("tryingToAccessApp", () => {
    it("knows when you want to access the app", () => {
        testLocationAndArgsPayloads(tryingToAccessApp, ScreenUrls.APP_ROUTER, true);
    });

    it("knows when you want to access a sub-route of the app", () => {
        testLocationAndArgsPayloads(tryingToAccessApp, ScreenUrls.PROFILE, true);
    });

    it("knows when you aren't trying to access the app", () => {
        testLocationAndArgsPayloads(tryingToAccessApp, ScreenUrls.LOGIN, false);
    });
});

describe("tryingToAccessAuth", () => {
    it("knows when you want to access the login page", () => {
        testLocationAndArgsPayloads(tryingToAccessAuth, ScreenUrls.LOGIN, true);
    });

    it("knows when you want to access the signup page", () => {
        testLocationAndArgsPayloads(tryingToAccessAuth, ScreenUrls.SIGN_UP, true);
    });

    it("knows when you aren't trying to access the auth page", () => {
        testLocationAndArgsPayloads(tryingToAccessAuth, ScreenUrls.APP_ROUTER, false);
    });
});
