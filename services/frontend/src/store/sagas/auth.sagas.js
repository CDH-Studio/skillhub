import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {push, replace} from "connected-react-router";
import api from "api/";
import {authRequestsSlice, userSlice} from "store/slices";
import {routerActionTypes, tryingToAccessApp, tryingToAccessAuth} from "store/utils";
import {User} from "utils/models";
import ScreenUrls from "utils/screenUrls";

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
    const userProfile = yield call(api.service("profiles").find, {query: {userId: result.user.id}});

    if (!userProfile) {
        yield put(push(ScreenUrls.ONBOARDING));
    } else {
        yield put(push(ScreenUrls.SEARCH));
    }
}

function* authLogout() {
    yield call(api.logout);
    yield put(push(ScreenUrls.LANDING));
}

function* authenticateAppAccess({payload}) {
    if (tryingToAccessApp(payload) && !api.isAuthenticated()) {
        const userId = yield select(userSlice.selectors.getUserId);
        const userProfile = yield call(api.service("profiles").find, {query: {userId: userId}});
        if (!userProfile) {
            yield put(replace(ScreenUrls.ONBOARDING));
        } else {
            yield put(replace(ScreenUrls.SEARCH));
        }
    }
}

function* ensureProfileCreated({payload}) {
    // if (tryingToAccessApp(payload) && api.isAuthenticated()) {
    //     const userId = yield select(userSlice.selectors.getUserId);
    //     const userProfile = yield call(api.service("profiles").find, {query: {userId: userId}});
    //     if (!userProfile) {
    //         yield put(replace(ScreenUrls.ONBOARDING));
    //     }
    // }
}

function* redirectAuthenticatedUserToApp({payload}) {
    if (tryingToAccessAuth(payload) && api.isAuthenticated()) {
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
