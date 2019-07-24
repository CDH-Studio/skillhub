import {connect} from "react-redux";
import {dialogsStateSlice, projectsRequestsSlice} from "store/slices";

const mapStateToProps = (state) => ({
    error: projectsRequestsSlice.patchProjectInfo.selectors.getError(state),
    open: dialogsStateSlice.selectors.getProjectInfoDialogState(state)
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (id, name, description) => dispatch(
        projectsRequestsSlice.patchProjectInfo.actions.request({
            id, name, description
        })
    ),
    setDialogState: (dialog, dialogState) => dispatch(
        dialogsStateSlice.actions.setDialogState({
            dialog, dialogState
        })
    ),
    clearPatchError: () => dispatch(
        projectsRequestsSlice.patchProjectInfo.actions.clear()
    )
});

export default connect(mapStateToProps, mapDispatchToProps);
