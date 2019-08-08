import {call, fork, put} from "redux-saga/effects";
import api from "api/";
import {
    dialogsStateSlice, notificationSlice, projectsSlice,
    projectsRequestsSlice, projectProfilesSlice, projectChangeRecordsRequestsSlice
} from "store/slices";
import {Project} from "utils/models";

function* projectsFetchAll() {
    const result = yield call(api.service("projects").find);

    const projectProfiles = Project.extractProjectProfiles(result);
    const normalizedProjects = Project.normalizeApiResultsForRedux(result);

    yield put(projectsSlice.actions.setProjects(normalizedProjects));
    yield put(projectProfilesSlice.actions.addProjectProfiles(projectProfiles));
}

function* projectsPatchProjectInfo({payload}, success) {
    try {
        const result = yield call(api.service("projects").patch, payload.id, payload);
        const normalizedProject = Project.normalizeProject(result);

        yield put(projectsSlice.actions.setProject(normalizedProject));
        yield call(success);  // Mark success before continuing with other actions
    } catch (error) {
        // On failure set the error to show up in the dialog box and re-throw
        yield put(notificationSlice.actions.setNotification(
            {type: "error", message: error.message, createdAt: new Date()}
        ));
        throw error;
    }

    // Update the changelogs
    yield put(projectChangeRecordsRequestsSlice.fetchAll.actions.request());

    // Close the dialog box
    yield put (dialogsStateSlice.actions.setDialogState({
        dialog: "projectInfo",
        dialogState: false
    }));

    // Push the "success" notification
    yield put(notificationSlice.actions.setNotification(
        {type: "success", message: "Updated project successfully", createdAt: new Date()}
    ));
}

function* projectsCreateProjectProfile({payload}, success) {
    try {
        yield call(api.service("projects").create, payload);
        const result = yield call(api.service("projects").get, payload.id);

        const projectProfiles = result.projectProfiles;
        const normalizedProject = Project.normalizeProject(result);

        yield put(projectsSlice.actions.setProject(normalizedProject));
        yield put(projectProfilesSlice.actions.addProjectProfiles(projectProfiles));
        yield call(success);  // Mark success before continuing with other actions
    } catch (error) {
        yield put(notificationSlice.actions.setNotification(
            {type: "error", message: error.message, createdAt: new Date()}
        ));
        throw error;
    }

    // Update the changelogs
    yield put(projectChangeRecordsRequestsSlice.fetchAll.actions.request());

    // Close the dialog box
    yield put (dialogsStateSlice.actions.setDialogState({
        dialog: "roleInput",
        dialogState: false
    }));
    yield put(notificationSlice.actions.setNotification(
        {type: "success", message: "Project Added Successfully", createdAt: new Date()}
    ));
}

function* projectsSaga() {
    yield fork(projectsRequestsSlice.fetchAll.watchRequestSaga(
        projectsFetchAll
    ));

    yield fork(projectsRequestsSlice.createProjectProfile.watchRequestSaga(
        projectsCreateProjectProfile
    ));

    yield fork(projectsRequestsSlice.patchProjectInfo.watchRequestSaga(
        projectsPatchProjectInfo
    ));
}

export default projectsSaga;
