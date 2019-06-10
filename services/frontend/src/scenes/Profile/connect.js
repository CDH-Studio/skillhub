import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {profilesRequestsSlice} from "store/slices";

const mapStateToProps = (state) => ({
    profileLoadingState: profilesRequestsSlice.fetchAll.selectors.getLoading(state),
    projects: crossSliceSelectors.getProjectsForUser(state),
    userProfile: crossSliceSelectors.getUserProfile(state)
});

export default connect(mapStateToProps, null);
