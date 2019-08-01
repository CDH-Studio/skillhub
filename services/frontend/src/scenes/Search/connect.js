import {connect} from "react-redux";
import {reduceLoadingStates} from "utils/helperFunctions";
import {crossSliceSelectors} from "store/";
import {
    profilesRequestsSlice,
    projectsRequestsSlice,
    skillsRequestsSlice
} from "store/slices";

const mapStateToProps = (state) => ({
    projects: crossSliceSelectors.getProjectsWithSkills(state),
    profiles: crossSliceSelectors.getProfilesWithSkills(state),
    isLoading: reduceLoadingStates([
        profilesRequestsSlice,
        projectsRequestsSlice,
        skillsRequestsSlice
    ], state)
});

export default connect(mapStateToProps, null);
