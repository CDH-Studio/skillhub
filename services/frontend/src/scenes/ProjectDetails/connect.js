import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";

const mapStateToProps = (state) => ({
    project: crossSliceSelectors.getProjectFromUrlId(state)
});

export default connect(mapStateToProps, null);
