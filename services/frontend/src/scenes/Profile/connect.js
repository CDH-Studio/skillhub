import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {reduceLoadingStates} from "utils/helperFunctions";
import {profilesRequestsSlice, projectsRequestsSlice, skillsRequestsSlice} from "store/slices";
import ScreenUrls from "utils/screenUrls";

const mapStateToProps = (state) => {
    const mappedState = {};
    mappedState.isLoading = reduceLoadingStates([
        profilesRequestsSlice,
        projectsRequestsSlice,
        skillsRequestsSlice
    ], state);

    if (crossSliceSelectors.isMatchingRoute(ScreenUrls.PROFILE)(state)) {
        mappedState.projects = crossSliceSelectors.getProjectsForUser(state);
        mappedState.profile = crossSliceSelectors.getUserProfile(state);

    } else {
        const loadedProfile = crossSliceSelectors.getProfileFromUrlId(state);

        if (loadedProfile) {
            mappedState.profile = loadedProfile;
            mappedState.projects = crossSliceSelectors.getProjectsFromProfileUrlId(state);

        } else {
            mappedState.profile = {};
            mappedState.projects = [];
        }
    }
    return mappedState;
};

export default connect(mapStateToProps, null);
