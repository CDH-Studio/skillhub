import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {reduceLoadingStates} from "utils/helperFunctions";
import {projectsRequestsSlice, profilesRequestsSlice, skillsRequestsSlice} from "store/slices";

const mapStateToProps = (state) => {
    const mappedState = {};
    const loadedProject = crossSliceSelectors.getProjectFromUrlId(state);

    /* All loading dependencies */
    mappedState.isLoading = reduceLoadingStates([
        profilesRequestsSlice,
        projectsRequestsSlice,
        skillsRequestsSlice
    ], state);

    /* Map required data for the project details request */
    if (loadedProject) {
        mappedState.project = loadedProject;
        mappedState.contributors = crossSliceSelectors.getContributorsForProject(state);
    } else {
        mappedState.projectChangeRecords = crossSliceSelectors.getProjectChangeRecordsForProject(state);
        mappedState.project = {};
        mappedState.contributors = [];
    }

    return mappedState;
};

export default connect(mapStateToProps, null);
