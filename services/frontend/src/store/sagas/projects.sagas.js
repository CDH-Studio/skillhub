import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {projectsSlice, projectsRequestsSlice} from "store/slices";

function* projectsFetchAll() {
    const result = yield call(api.service("projects").find);

    const cleanedProjects = result.reduce((acc, project) => {
        const cleanProject = {...project};
        cleanProject.skills = cleanProject.skills.map(({id}) => id);

        acc[cleanProject.id] = cleanProject;
        return acc;
    }, {});

    yield put(projectsSlice.actions.setProjects(cleanedProjects));
}

function* projectsSaga() {
    yield fork(projectsRequestsSlice.fetchAll.watchRequestSaga(projectsFetchAll));
}

export default projectsSaga;
