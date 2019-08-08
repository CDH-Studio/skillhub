import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {usersSlice, usersRequestsSlice} from "store/slices";
import {User} from "utils/models";

function* usersFetchAll() {
    const result = yield call(api.service("users").find);

    const normalizedUsers = User.normalizeApiResultsForRedux(result);
    yield put(usersSlice.actions.setUsers(normalizedUsers));
}

function* usersSaga() {
    yield fork(usersRequestsSlice.fetchAll.watchRequestSaga(
        usersFetchAll
    ));
}

export default usersSaga;
