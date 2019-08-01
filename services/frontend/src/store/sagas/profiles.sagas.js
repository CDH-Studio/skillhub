import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {
    dialogsStateSlice, notificationSlice, profilesSlice, profilesRequestsSlice, profileSkillsSlice
} from "store/slices";
import {Profile} from "utils/models";

function* profilesFetchAll() {
    const result = yield call(api.service("profiles").find);

    const profileSkills = Profile.extractProfileSkills(result);
    const normalizedProfiles = Profile.normalizeApiResultsForRedux(result);

    yield put(profilesSlice.actions.setProfiles(normalizedProfiles));
    yield put(profileSkillsSlice.actions.addProfileSkills(profileSkills));
}

function* profilesPatchPersonalDetails({payload}, success) {
    try {
        const result = yield call(api.service("profiles").patch, payload.id, payload);
        const normalizedProfile = Profile.normalizeProfile(result);

        yield put(profilesSlice.actions.setProfile(normalizedProfile));
        yield call(success);  // Mark success before continuing with other actions
    } catch (error) {
        yield put(notificationSlice.actions.setNotification(
            {type: "error", message: error.message, createdAt: new Date()}
        ));
        throw error;
    }

    yield put (dialogsStateSlice.actions.setDialogState({
        dialog: "personalDetails",
        dialogState: false
    }));
    yield put(notificationSlice.actions.setNotification(
        {type: "success", message: "Updated profile successfully", createdAt: new Date()}
    ));
}

function* addNewProfileSkills({payload}) {
    try {
        const result = yield call(api.service("profiles").create, payload.profile);

        const normalizedProfile = Profile.normalizeProfile(result);
        yield put(profilesSlice.actions.setProfile(normalizedProfile));
    } catch (error) {
        yield put(notificationSlice.actions.setNotification(
            {type: "error", message: error.message, createdAt: new Date()}
        ));
        throw error;
    }

    yield put(notificationSlice.actions.setNotification(
        {type: "success", message: "Updated Skills Successfully", createdAt: new Date()}
    ));
}

function* patchProfileSkills({payload}) {
    try {
        const result = yield call(api.service("profiles").patch, payload.profile);

        const normalizedProfile = Profile.normalizeProfile(result);
        yield put(profilesSlice.actions.setProfile(normalizedProfile));
    } catch (error) {
        yield put(notificationSlice.actions.setNotification(
            {type: "error", message: error.message, createdAt: new Date()}
        ));
        throw error;
    }

    yield put(notificationSlice.actions.setNotification(
        {type: "success", message: "Updated Skills Successfully", createdAt: new Date()}
    ));
}

function* profilesSaga() {
    yield fork(profilesRequestsSlice.fetchAll.watchRequestSaga(
        profilesFetchAll
    ));

    yield fork(profilesRequestsSlice.addNewProfileSkills.watchRequestSaga(
        addNewProfileSkills
    ));

    yield fork(profilesRequestsSlice.patchProfileSkills.watchRequestSaga(
        patchProfileSkills
    ));

    yield fork(profilesRequestsSlice.patchPersonalDetails.watchRequestSaga(
        profilesPatchPersonalDetails
    ));
}

export default profilesSaga;
