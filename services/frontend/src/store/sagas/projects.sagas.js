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

function* projectsPatchProjectDetails({payload}, success) {
    try {
        const result = yield call(api.service("projects").patch, payload.id, payload);
        const normalizedProject = Project.normalizeProject(result);

        yield put(projectsSlice.actions.setProject(normalizedProject));
    }
    catch (error) {
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
    yield call(success);
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
