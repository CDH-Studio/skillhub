import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {
    projectChangeRecordsRequestsSlice, projectChangeRecordsSlice
} from "store/slices";

function* projectChangeRecordsFetchAll() {
    const result = yield call(api.service("projectChangeRecords").find);
    yield put(projectChangeRecordsSlice.actions.addProjectChangeRecords(result));
}

function* projectsSaga() {
    yield fork(projectChangeRecordsRequestsSlice.fetchAll.watchRequestSaga(
        projectChangeRecordsFetchAll
    ));
}

export default projectsSaga;
