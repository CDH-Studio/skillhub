import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {profilesRequestsSlice} from "store/slices";

const mapStateToProps = (state) => ({
    userProfile: crossSliceSelectors.getUserProfile(state),
    profileLoadingState: profilesRequestsSlice.fetchAll.selectors.getLoading(state)
});

export default connect(mapStateToProps, null);
