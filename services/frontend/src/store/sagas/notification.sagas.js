import {call, fork, put} from "redux-saga/effects";
import {notificationRequestsSlice, notificationSlice} from "store/slices";

function* setNewNotification({payload}, success) {
    yield put (notificationSlice.actions.setNotification(payload));
    yield call(success);
}

function* notificationSaga() {
    yield fork(notificationRequestsSlice.setNotification.watchRequestSaga(
        setNewNotification
    ));
}

export default notificationSaga;
