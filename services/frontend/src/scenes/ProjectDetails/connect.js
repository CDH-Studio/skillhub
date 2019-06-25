import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";
import {projectsRequestsSlice} from "store/slices";

const mapStateToProps = (state) => ({
    isLoading: projectsRequestsSlice.fetchAll.selectors.getLoading(state),
    project: crossSliceSelectors.getProjectFromUrlId(state),
    contributors: crossSliceSelectors.getContributorsForProject(state)
});

export default connect(mapStateToProps, null);
