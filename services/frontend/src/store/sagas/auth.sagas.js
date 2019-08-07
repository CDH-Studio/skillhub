import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {push, replace} from "connected-react-router";
import api from "api/";
import {authRequestsSlice, userSlice} from "store/slices";
import {routerActionTypes, tryingToAccessApp, tryingToAccessAuth} from "store/utils";
import {User} from "utils/models";
import ScreenUrls from "utils/screenUrls";
import {crossSliceSelectors} from "store";

function* authSignUp({payload}, success) {
    const {email, password} = payload;
    User.validateInfo(email, password);

    yield call(api.service("users").create, {email, password});
    yield call(success);  // Mark success before continuing with other actions

    yield put(authRequestsSlice.login.actions.request(payload));
}

function* authLogin({payload}, success) {
    const {email, password} = payload;
    User.validateInfo(email, password);

    const result = yield call(api.authenticate, {strategy: "local", email, password});
    yield call(success);  // Mark success before continuing with other actions

    yield put(userSlice.actions.setUser({id: result.user.id, email}));
    yield put(push(ScreenUrls.SEARCH));
}

function* authLogout() {
    yield call(api.logout);
    yield put(push(ScreenUrls.LANDING));
}

function* authenticateAppAccess({payload}) {
    const userProfile = yield select(crossSliceSelectors.getUserProfile);

    if (tryingToAccessApp(payload) && !api.isAuthenticated() && userProfile) {
        console.log("debug2")
        yield put(replace(ScreenUrls.LOGIN));
    }
}

function* ensureProfileCreated({payload}) {
    const userProfile = yield select(crossSliceSelectors.getUserProfile);
    console.log(!userProfile)

    if (tryingToAccessApp(payload) && api.isAuthenticated() && !userProfile) {
        console.log("debug")
        yield put(replace(ScreenUrls.LOGIN));
    }
}

function* redirectAuthenticatedUserToApp({payload}) {
    if (tryingToAccessAuth(payload) && api.isAuthenticated()) {
        console.log("nolo")
        yield put(replace(ScreenUrls.SEARCH));
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

    yield fork(authRequestsSlice.logout.watchRequestSaga(
        authLogout,
        {routeChangeCancellable: true, processEvery: false}
    ));

    yield all([
        takeEvery(routerActionTypes, authenticateAppAccess),
        takeEvery(routerActionTypes, ensureProfileCreated),
        takeEvery(routerActionTypes, redirectAuthenticatedUserToApp)
    ]);
}

export default authSaga;
