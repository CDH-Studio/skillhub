import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {profilesSlice, profilesRequestsSlice} from "store/slices";
import {Profile} from "utils/models";

function* profilesFetchAll() {
    const result = yield call(api.service("profiles").find);
    const normalizedProfiles = Profile.normalizeApiResultsForRedux(result);

    yield put(profilesSlice.actions.setProfiles(normalizedProfiles));
}

function* profilesSaga() {
    yield fork(profilesRequestsSlice.fetchAll.watchRequestSaga(profilesFetchAll));
}

export default profilesSaga;
