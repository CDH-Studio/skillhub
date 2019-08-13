import {call, fork, put} from "redux-saga/effects";
import {push} from "connected-react-router";
import api from "api/";
import {
    dialogsStateSlice, notificationSlice, profilesSlice, profilesRequestsSlice, profileSkillsSlice
} from "store/slices";
import ScreenUrls from "utils/screenUrls";
import {Profile} from "utils/models";

function* profilesFetchAll() {
    const result = yield call(api.service("profiles").find);

    const profileSkills = Profile.extractProfileSkills(result);
    const normalizedProfiles = Profile.normalizeApiResultsForRedux(result);

    yield put(profilesSlice.actions.setProfiles(normalizedProfiles));
    yield put(profileSkillsSlice.actions.addProfileSkills(profileSkills));
}

function* profilesCreateProfile({payload}) {
    payload.validate = true;

    const result = yield call(api.service("profiles").create, payload);
    const normalizedProfile = Profile.normalizeProfile(result);

    yield put(profilesSlice.actions.setProfile(normalizedProfile));
    yield put(push(ScreenUrls.SEARCH));

    yield put(notificationSlice.actions.setNotification(
        {type: "success", message: "Profile Created Successfully", createdAt: new Date()}
    ));
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

function* updateProfileSkills({payload}) {
    try {
        const result = yield call(api.service("profiles").patch, payload.profile.id, payload.profile);

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

    yield fork(profilesRequestsSlice.updateProfileSkills.watchRequestSaga(
        updateProfileSkills
    ));

    yield fork(profilesRequestsSlice.createProfile.watchRequestSaga(
        profilesCreateProfile
    ));

    yield fork(profilesRequestsSlice.patchPersonalDetails.watchRequestSaga(
        profilesPatchPersonalDetails
    ));
}

export default profilesSaga;
