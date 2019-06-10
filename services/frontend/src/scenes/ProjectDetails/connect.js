import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";

const mapStateToProps = (state) => ({
    projects: crossSliceSelectors.getProjectsWithSkills(state)
});

export default connect(mapStateToProps, null);
