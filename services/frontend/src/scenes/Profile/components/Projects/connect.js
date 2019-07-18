import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {
    dialogsStateSlice, profilesRequestsSlice,
} from "store/slices";

const mapStateToProps = (state) => ({
    error: profilesRequestsSlice.patchPersonalDetails.selectors.getError(state),
    roleInputDialogOpen: dialogsStateSlice.selectors.getRoleInputDialogState(state),
    searchDialogOpen: dialogsStateSlice.selectors.getSearchProjectDialogState(state),
    unrelatedProjects: crossSliceSelectors.getUnrelatedProjectsForUser(state)
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle) => dispatch(
        profilesRequestsSlice.patchPersonalDetails.actions.request({
            id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle
        })
    ),
    setDialogState: (dialog, dialogState) => dispatch(
        dialogsStateSlice.actions.setDialogState({
            dialog, dialogState
        })
    ),
    clearPatchError: () => dispatch(
        profilesRequestsSlice.patchPersonalDetails.actions.clear()
    )
});

export default connect(mapStateToProps, mapDispatchToProps);
