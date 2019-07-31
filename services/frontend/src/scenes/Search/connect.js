import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";

const mapStateToProps = (state) => ({
    projects: crossSliceSelectors.getProjectsWithSkills(state),
    profiles: crossSliceSelectors.getProfilesWithSkills(state)
});

const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, null);
