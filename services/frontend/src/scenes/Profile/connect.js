import {connect} from "react-redux";
import {matchPath} from "react-router";
import {crossSliceSelectors} from "store/";
import {reduceLoadingStates} from "utils/helperFunctions";
import {profilesRequestsSlice, projectsRequestsSlice, skillsRequestsSlice} from "store/slices";
import ScreenUrls from "utils/screenUrls";

const mapStateToProps = (state, props) => {
    const mappedState = {};
    mappedState.isLoading = reduceLoadingStates([
        profilesRequestsSlice,
        projectsRequestsSlice,
        skillsRequestsSlice
    ], state);

    if (matchPath(props.match.path, ScreenUrls.PROFILE)) {
        mappedState.projects = crossSliceSelectors.getProjectsForUser(state);
        mappedState.profile = crossSliceSelectors.getUserProfile(state);

    } else {
        const loadedProfile = crossSliceSelectors.getProfileFromUrlId(state);

        if (loadedProfile) {
            mappedState.profile = loadedProfile;
            mappedState.projects = crossSliceSelectors.getProjectsFromUrlId(state);

        } else {
            mappedState.profile = {};
            mappedState.projects = [];
        }
    }
    return mappedState;
};

export default connect(mapStateToProps, null);
