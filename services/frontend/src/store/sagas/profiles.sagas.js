import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {profilesSlice, profilesRequestsSlice, profileSkillsSlice} from "store/slices";
import {Profile} from "utils/models";

function* profilesFetchAll() {
    const result = yield call(api.service("profiles").find);

    const profileSkills = Profile.extractProfileSkills(result);
    const normalizedProfiles = Profile.normalizeApiResultsForRedux(result);

    yield put(profilesSlice.actions.setProfiles(normalizedProfiles));
    yield put(profileSkillsSlice.actions.addProfileSkills(profileSkills));
}

function* profilesPatchPersonalDetails({payload}, success) {
    const result = yield call(api.service("profiles").patch, payload.id, payload);
    const normalizedProfile = Profile.normalizeProfile(result);

    yield put(profilesSlice.actions.setProfile(normalizedProfile));

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
