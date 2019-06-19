import {connect} from "react-redux";
import {matchPath} from "react-router";
import {crossSliceSelectors} from "store/";
import {profilesRequestsSlice} from "store/slices";
import ScreenUrls from "utils/screenUrls";

const mapStateToProps = (state, props) => {
    if (matchPath(props.match.path, ScreenUrls.PROFILE)) {
        return {
            projects: crossSliceSelectors.getProjectsForUser(state),
            profile: crossSliceSelectors.getUserProfile(state)
        };
    }
    else {
        const personProfile = crossSliceSelectors.getProfileFromUrlId(state);

        return personProfile ? {
            isLoading: profilesRequestsSlice.fetchAll.selectors.getLoading(state),
            projects: crossSliceSelectors.getProjectsFromUrlId(state),
            profile: personProfile
        } : (
            props.history.push("/404")
        );
    }

    /*
    return {
    isLoading: profilesRequestsSlice.fetchAll.selectors.getLoading(state),

    ...(matchPath(props.match.pathName, ScreenUrls.PROFILE) ? ({
        projects: crossSliceSelectors.getProjectsForUser(state),
        profile: crossSliceSelectors.getUserProfile(state)
    }) : ({
        projects: crossSliceSelectors.getProjectsForUser(state),
        profile: crossSliceSelectors.getProfileFromUrlId(state)
    }))
    */
};

export default connect(mapStateToProps, null);
