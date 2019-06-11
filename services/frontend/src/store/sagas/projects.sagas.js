import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {projectsSlice, projectsRequestsSlice, projectProfilesSlice} from "store/slices";
import {Project} from "utils/models";

function* projectsFetchAll() {
    const result = yield call(api.service("projects").find);

    const projectProfiles = result.reduce((acc, project) => [...acc, ...project.projectProfiles], []);
    const normalizedProjects = Project.normalizeApiResultsForRedux(result);

    yield put(projectsSlice.actions.setProjects(normalizedProjects));
    yield put(projectProfilesSlice.actions.addProjectProfiles(projectProfiles));
}

function* projectsSaga() {
    yield fork(projectsRequestsSlice.fetchAll.watchRequestSaga(projectsFetchAll));
}

export default projectsSaga;
