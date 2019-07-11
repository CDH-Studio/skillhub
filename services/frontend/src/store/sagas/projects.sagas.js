import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {projectsSlice, projectsRequestsSlice, projectProfilesSlice} from "store/slices";
import {Project} from "utils/models";

function* projectsFetchAll() {
    const result = yield call(api.service("projects").find);

    const projectProfiles = Project.extractProjectProfiles(result);
    const normalizedProjects = Project.normalizeApiResultsForRedux(result);

    yield put(projectsSlice.actions.setProjects(normalizedProjects));
    yield put(projectProfilesSlice.actions.addProjectProfiles(projectProfiles));
}

function* projectsPatchProjectDetails({payload}, success) {
    const result = yield call(api.service("projects").patch, payload.id, payload);
    const normalizedProfile = Project.normalizeProfile(result);

    yield put(projectsSlice.actions.setProfile(normalizedProfile));

    yield call(success);  // Mark success before continuing with other actions
}

function* projectsSaga() {
    yield fork(projectsRequestsSlice.fetchAll.watchRequestSaga(
        projectsFetchAll
    ));

    yield fork(projectsRequestsSlice.patchProjectDetails.watchRequestSaga(
        projectsPatchProjectDetails
    ));
}

export default projectsSaga;
