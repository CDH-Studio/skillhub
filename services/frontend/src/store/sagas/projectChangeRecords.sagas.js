import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {
    projectChangeRecordsRequestsSlice, projectChangeRecordsSlice
} from "store/slices";
import {ProjectChangeRecord} from "utils/models";

function* projectChangeRecordsFetchAll() {
    const result = yield call(api.service("projectChangeRecords").find);

    const normalizedProjectChangeRecords = ProjectChangeRecord.normalizeApiResultsForRedux(result);

    yield put(projectChangeRecordsSlice.actions.setProjectChangeRecords(normalizedProjectChangeRecords));
}

function* projectChangeRecordsAddRecord({payload}, success) {
    yield call(api.service("projectChangeRecords").create, payload);
    yield call(success);
}

function* projectsSaga() {
    yield fork(projectChangeRecordsRequestsSlice.fetchAll.watchRequestSaga(
        projectChangeRecordsFetchAll
    ));

    yield fork(projectChangeRecordsRequestsSlice.addProjectChangeRecord.watchRequestSaga(
        projectChangeRecordsAddRecord
    ));
}

export default projectsSaga;
