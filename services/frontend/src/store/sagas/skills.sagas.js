import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {skillsSlice, skillsRequestsSlice} from "store/slices";
import {Skill} from "utils/models";

function* skillsFetchAll() {
    const result = yield call(api.service("skills").find);
    const normalizedSkills = Skill.normalizeApiResultsForRedux(result);

    yield put(skillsSlice.actions.setSkills(normalizedSkills));
}

function* addSkill({payload}){
    console.log(payload);

    const result = yield call(api.service("skills").create, payload.skill);

    yield put(skillsSlice.setSkills(result));
}
function* skillsSaga() {
    yield fork(skillsRequestsSlice.fetchAll.watchRequestSaga(skillsFetchAll));
    yield fork(skillsRequestsSlice.addNewSkill.watchRequestSaga(
        addSkill
    ));
}

export default skillsSaga;
