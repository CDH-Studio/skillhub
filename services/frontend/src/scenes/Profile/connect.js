import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {profilesRequestsSlice} from "store/slices";

const mapStateToProps = (state) => ({
    isLoading: profilesRequestsSlice.fetchAll.selectors.getLoading(state),
    projects: crossSliceSelectors.getProjectsForUser(state),
    profile: crossSliceSelectors.getUserProfile(state)
});

export default connect(mapStateToProps, null);
