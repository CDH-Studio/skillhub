import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {skillsSlice, skillsRequestsSlice} from "store/slices";

function* skillsFetchAll() {
    const result = yield call(api.service("skills").find);

    const indexedSkills = result.reduce((acc, skill) => {
        acc[skill.id] = skill;
        return acc;
    }, {});

    yield put(skillsSlice.actions.setSkills(indexedSkills));
}

function* skillsSaga() {
    yield fork(skillsRequestsSlice.fetchAll.watchRequestSaga(skillsFetchAll));
}

export default skillsSaga;
