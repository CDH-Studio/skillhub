import {call, fork, put} from "redux-saga/effects";
import {notificationRequestsSlice, notificationSlice} from "store/slices";

function* pushNewNotification({payload}, success) {
    yield put (notificationSlice.actions.pushNotification(payload));
    yield call(success);
}

function* notificationSaga() {
    yield fork(notificationRequestsSlice.pushNotification.watchRequestSaga(
        pushNewNotification
    ));
}

export default notificationSaga;
