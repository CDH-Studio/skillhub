import feathers from "@feathersjs/client";

const AUTH_STORAGE_KEY = "skillhub-jwt";

const authConfig = {
    storage: window.localStorage,
    storageKey: AUTH_STORAGE_KEY
};

const auth = (api) =>  {
    const authService = feathers.authentication(authConfig);
    api.configure(authService);

    api.isAuthenticated = () => {
        const token = window.localStorage.getItem(AUTH_STORAGE_KEY);
        return !!api.passport.payloadIsValid(token);
    };
};

export default auth;
