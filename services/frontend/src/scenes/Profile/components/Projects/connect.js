import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {
    dialogsStateSlice, projectsRequestsSlice
} from "store/slices";

const mapStateToProps = (state) => ({
    error: projectsRequestsSlice.createProjectProfile.selectors.getError(state),
    roleInputDialogOpen: dialogsStateSlice.selectors.getRoleInputDialogState(state),
    searchDialogOpen: dialogsStateSlice.selectors.getSearchProjectDialogState(state),
    unrelatedProjects: crossSliceSelectors.getUnrelatedProjectsForUser(state)
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (project) => dispatch(
        projectsRequestsSlice.createProjectProfile.actions.request(
            project
        )
    ),
    setDialogState: (dialog, dialogState) => dispatch(
        dialogsStateSlice.actions.setDialogState({
            dialog, dialogState
        })
    ),
    clearCreateError: () => dispatch(
        projectsRequestsSlice.createProjectProfile.actions.clear()
    )
});

export default connect(mapStateToProps, mapDispatchToProps);
