import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {reduceLoadingStates} from "utils/helperFunctions";
import {projectsRequestsSlice, profilesRequestsSlice, skillsRequestsSlice} from "store/slices";

const mapStateToProps = (state) => {
    const mappedState = {};
    const projectInfoRequest = {};
    const loadedProject = crossSliceSelectors.getProjectFromUrlId(state);

    /* All loading dependencies */
    mappedState.isLoading = reduceLoadingStates([
        profilesRequestsSlice,
        projectsRequestsSlice,
        skillsRequestsSlice
    ], state);

    /* Map required data for the project details request */
    mappedState.projectInfoRequest = projectInfoRequest;

    if (loadedProject) {
        mappedState.project = loadedProject;
        mappedState.contributors = crossSliceSelectors.getContributorsForProject(state);
    }
    else {
        mappedState.project = {};
        mappedState.contributors = [];
    }

    return mappedState;
};

const mapDispatchToProps = (dispatch) => ({
    submitProjectInfo: (id, name, description) => dispatch(
        projectsRequestsSlice.patchProjectDetails.actions.request({
            id, name, description
        })
    )
});

export default connect(mapStateToProps, mapDispatchToProps);
