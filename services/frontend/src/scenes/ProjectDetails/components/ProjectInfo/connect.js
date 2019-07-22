import {connect} from "react-redux";
import {dialogsStateSlice, projectsRequestsSlice} from "store/slices";

const mapStateToProps = (state) => ({
    error: projectsRequestsSlice.patchProjectDetails.selectors.getError(state),
    open: dialogsStateSlice.selectors.getProjectInfoDialogState(state)
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (id, name, description) => dispatch(
        projectsRequestsSlice.patchProjectDetails.actions.request({
            id, name, description
        })
    ),
    setDialogState: (dialog, dialogState) => dispatch(
        dialogsStateSlice.actions.setDialogState({
            dialog, dialogState
        })
    ),
    clearPatchError: () => dispatch(
        projectsRequestsSlice.patchProjectDetails.actions.clear()
    )
});

export default connect(mapStateToProps, mapDispatchToProps);
