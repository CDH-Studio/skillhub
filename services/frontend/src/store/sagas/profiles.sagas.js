import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {profilesSlice, profilesRequestsSlice, profileSkillsSlice, notificationRequestsSlice} from "store/slices";
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
    }
    catch (error) {
        yield put(notificationRequestsSlice.pushNotification.actions.request(
            {type: "error", message: error.message}
        ));
        throw error;
    }

    yield put(notificationRequestsSlice.pushNotification.actions.request(
        {type: "success", message: "Updated successfully"}
    ));
    yield call(success);  // Mark success before continuing with other actions

}

function* profilesSaga() {
    yield fork(profilesRequestsSlice.fetchAll.watchRequestSaga(
        profilesFetchAll
    ));

    yield fork(profilesRequestsSlice.patchPersonalDetails.watchRequestSaga(
        profilesPatchPersonalDetails
    ));

}

export default profilesSaga;
