import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";

const mapStateToProps = (state) => ({
    project: crossSliceSelectors.getProjectFromUrlId(state),
    projectProfiles: crossSliceSelectors.getProjectProfilesWithProjectId(state)
});

export default connect(mapStateToProps, null);
