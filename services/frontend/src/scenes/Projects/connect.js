import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";

const mapStateToProps = (state) => ({
    projects: crossSliceSelectors.getProjectsForUser(state)
});

export default connect(mapStateToProps, null);
