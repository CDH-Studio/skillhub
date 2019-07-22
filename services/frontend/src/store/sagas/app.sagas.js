import {call, put, take, takeLatest} from "redux-saga/effects";
import api from "api/";
import {
    authRequestsSlice, projectChangeRecordsRequestsSlice, profilesRequestsSlice,
    projectsRequestsSlice, skillsRequestsSlice
} from "store/";
import {routerActionTypes, tryingToAccessApp} from "store/utils";

/* Things to do after first logging in or after the user
 * refreshes the page while logged in (e.g. fetch up data). */
function* appBoot() {
    yield put(skillsRequestsSlice.fetchAll.actions.request());
    yield take(skillsRequestsSlice.fetchAll.actions.success);

    yield put(projectChangeRecordsRequestsSlice.fetchAll.actions.request());
    yield put(projectsRequestsSlice.fetchAll.actions.request());
    yield put(profilesRequestsSlice.fetchAll.actions.request());
}

/* The first app boot is handled when the authenticated user navigates to
 * the app (i.e. app boot triggered by route change). This also handles the
 * case where the user refreshes the page while already logged in.
 *
 * Subsequent app boots can happen if the user logs out and logs back in again
 * without refreshing; these are handled by listening for the loginSuccess action. */
function* watchAppBoot() {
    let firstBoot = false;

    while (!firstBoot) {
        const {payload} = yield take(routerActionTypes);

        if (tryingToAccessApp(payload) && api.isAuthenticated()) {
            yield call(appBoot);
            firstBoot = true;
        }
    }

    yield takeLatest(authRequestsSlice.login.actions.success, appBoot);
}

function* appSaga() {
    yield call(watchAppBoot);
}

export default appSaga;
