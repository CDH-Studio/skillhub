import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {projectsSlice, projectsRequestsSlice} from "store/slices";
import {Project} from "utils/models";

function* projectsFetchAll() {
    const result = yield call(api.service("projects").find);
    console.log(result)
    const normalizedProjects = Project.normalizeApiResultsForRedux(result);

    yield put(projectsSlice.actions.setProjects(normalizedProjects));
}

function* projectsSaga() {
    yield fork(projectsRequestsSlice.fetchAll.watchRequestSaga(projectsFetchAll));
}

export default projectsSaga;
