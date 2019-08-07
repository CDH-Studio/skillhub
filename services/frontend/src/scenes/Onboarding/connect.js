import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";

const mapStateToProps = (state) => ({
    profiles: crossSliceSelectors.getProfilesWithSkills(state)
});

export default connect(mapStateToProps, null);