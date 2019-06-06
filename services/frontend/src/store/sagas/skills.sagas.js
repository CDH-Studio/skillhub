import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {skillsSlice, skillsRequestsSlice} from "store/slices";
import {Skill} from "utils/models";

function* skillsFetchAll() {
    const result = yield call(api.service("skills").find);
    const normalizedSkills = Skill.normalizeApiResultsForRedux(result);

    yield put(skillsSlice.actions.setSkills(normalizedSkills));
}

function* skillsSaga() {
    yield fork(skillsRequestsSlice.fetchAll.watchRequestSaga(skillsFetchAll));
}

export default skillsSaga;
