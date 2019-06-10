import {connect} from "react-redux";
import {profilesSlice} from "store/slices";

const mapStateToProps = (state) => ({
    userProfile: profilesSlice.selectors.getCurrentUserProfile(state)
});

export default connect(mapStateToProps, null);
