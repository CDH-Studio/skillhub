import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {projectProfilesSlice, projectProfilesRequestsSlice} from "store/slices";

function* projectProfilesFetchAll() {
    const result = yield call(api.service("projectProfiles").find);
    yield put(projectProfilesSlice.actions.addProjectProfiles(result));
}

function* projectProfilesSaga() {
    yield fork(projectProfilesRequestsSlice.fetchAll.watchRequestSaga(projectProfilesFetchAll));
}

export default projectProfilesSaga;
