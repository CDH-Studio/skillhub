import {connect} from "react-redux";
import {profilesSlice, profilesRequestsSlice} from "store/slices";

const mapStateToProps = (state) => {
    const profileLoadState = profilesRequestsSlice.fetchAll.selectors.getState(state);

    return {
        userProfile: profilesSlice.selectors.getCurrentUserProfile(state),
        profileLoadingState: profileLoadState.loading
    };
};

export default connect(mapStateToProps, null);
