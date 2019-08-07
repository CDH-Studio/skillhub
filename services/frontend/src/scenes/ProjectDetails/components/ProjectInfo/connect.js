import {connect} from "react-redux";
import {dialogsStateSlice, projectsRequestsSlice} from "store/slices";
import {crossSliceSelectors} from "store";

const mapStateToProps = (state) => ({
    profile: crossSliceSelectors.getUserProfile(state),
    roleInputDialogOpen: dialogsStateSlice.selectors.getRoleInputDialogState(state),
    patchProjectError: projectsRequestsSlice.patchProjectInfo.selectors.getError(state),
    addProjectError: projectsRequestsSlice.createProjectProfile.selectors.getError(state),
    open: dialogsStateSlice.selectors.getProjectInfoDialogState(state)
});

const mapDispatchToProps = (dispatch) => ({
    onPatchProject: (id, name, description) => dispatch(
        projectsRequestsSlice.patchProjectInfo.actions.request({
            id, name, description
        })
    ),
    onAddProject: (project) => dispatch(
        projectsRequestsSlice.createProjectProfile.actions.request(
            project
        )
    ),
    setDialogState: (dialog, dialogState) => dispatch(
        dialogsStateSlice.actions.setDialogState({
            dialog, dialogState
        })
    ),
    clearPatchError: () => dispatch(
        projectsRequestsSlice.patchProjectInfo.actions.clear()
    ),
    clearAddError: () => dispatch(
        projectsRequestsSlice.createProjectProfile.actions.clear()
    )
});

export default connect(mapStateToProps, mapDispatchToProps);
