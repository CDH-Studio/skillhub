import {all, call, fork, put, select, takeEvery} from "redux-saga/effects";
import {push, replace} from "connected-react-router";
import api from "api/";
import {authRequestsSlice, notificationSlice, userSlice} from "store/slices";
import {routerActionTypes, tryingToAccessApp, tryingToAccessAuth, tryingToAccessOnboarding} from "store/utils";
import {User} from "utils/models";
import ScreenUrls from "utils/screenUrls";

function* authSignUp({payload}, success) {
    const {email, password} = payload;
    User.validateInfo(email, password);

    const result = yield call(api.service("users").create, {email, password});
    yield call(success);  // Mark success before continuing with other actions

    yield put(authRequestsSlice.login.actions.request(payload));
    if (result.linkedProfile){
        yield put(notificationSlice.actions.setNotification(
            {type: "success", message: `Account Successfully Linked to User: ${email}`, createdAt: new Date()}
        ));
    }
}

function* authLogin({payload}, success) {
    const {email, password} = payload;
    User.validateInfo(email, password);

    const result = yield call(api.authenticate, {strategy: "local", email, password});
    yield call(success);  // Mark success before continuing with other actions

    yield put(userSlice.actions.setUser({id: result.user.id, email}));
    const userProfile = yield call(api.service("profiles").find, {query: {userId: result.user.id}});

    if (userProfile.length === 0) {
        yield put(push(ScreenUrls.ONBOARDING));
    } else {
        yield put(push(ScreenUrls.SEARCH));
    }
}

function* authLogout() {
    yield call(api.logout);
    yield put(push(ScreenUrls.LANDING));
}

/* trying to access the app or onboarding pages, redirected due to not being authenticated */
function* redirectUnAuthenticatedUserToAuth({payload}) {
    if ((tryingToAccessApp(payload) || tryingToAccessOnboarding(payload))
    && !api.isAuthenticated()) {
        yield put(push(ScreenUrls.LOGIN));
    }
}

function* redirectAuthenticatedUser({payload}) {
    try {
        if (api.isAuthenticated()) {
            const userId = yield select(userSlice.selectors.getUserId);
            const userProfile = yield call(api.service("profiles").find, {query: {userId: userId}});
            /* trying to access the app or onboarding pages, redirected due to not having
            * a profile setup yet */
            if ((tryingToAccessApp(payload) || tryingToAccessAuth(payload)) && userProfile.length === 0) {
                yield put(replace(ScreenUrls.ONBOARDING));
            /* trying to access the auth or onboarding pages, redirected due to already having
            * an account and profile  */
            } else if ((tryingToAccessAuth(payload) || tryingToAccessOnboarding(payload)) && userProfile.length > 0) {
                yield put(replace(ScreenUrls.SEARCH));
            }
        }
    } catch (e){
        if (e.name === "NotAuthenticated") {
            console.error(e);
        } else {
            throw (e);
        }
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
        takeEvery(routerActionTypes, redirectUnAuthenticatedUserToAuth),
        takeEvery(routerActionTypes, redirectAuthenticatedUser),
    ]);
}

export default authSaga;
