import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {push, replace} from "connected-react-router";
import api from "api/";
import {authRequestsSlice} from "store/slices";
import {routerActionTypes, tryingToAccessApp, tryingToAccessAuth} from "store/utils";
import {User} from "utils/models";
import ScreenUrls from "utils/screenUrls";

function* authSignUp({payload}, success) {
    const {email, password} = payload;
    User.validateUserInfo(email, password);

    yield call(api.service("users").create, {email, password});
    yield call(success);

    yield put(authRequestsSlice.login.actions.request(payload));
}

function* authLogin({payload}, success) {
    const {email, password} = payload;
    User.validateUserInfo(email, password);

    yield call(api.authenticate, {strategy: "local", email, password});
    yield call(success);

    yield put(push(ScreenUrls.APP_ROUTER));
}

function* authenticateAppAccess({payload}) {
    if (tryingToAccessApp(payload) && !api.isAuthenticated()) {
        yield put(replace(ScreenUrls.LOGIN));
    }
}

function* redirectAuthenticatedUserToApp({payload}) {
    if (tryingToAccessAuth(payload) && api.isAuthenticated()) {
        yield put(replace(ScreenUrls.APP_ROUTER));
    }
}

function* authSaga() {
    yield fork(authRequestsSlice.signUp.watchRequestSaga(
        authSignUp,
        {routeChangeCancellable: true, processEvery: false}
    ));

    yield fork(authRequestsSlice.login.watchRequestSaga(
        authLogin,
        {routeChangeCancellable: true, processEvery: false}
    ));

    yield all([
        takeEvery(routerActionTypes, authenticateAppAccess),
        takeEvery(routerActionTypes, redirectAuthenticatedUserToApp)
    ]);
}

export default authSaga;
