import {connect} from "react-redux";
import {authRequestsSlice} from "store/";
import ScreenUrls from "utils/screenUrls";

const mapPathToTab = (path) => {
    if (path === ScreenUrls.PROFILE) {
        return 1;
    } else if (path.includes(ScreenUrls.SEARCH)) {
        return 0;
    } else if (path === ScreenUrls.PROJECTS) {
        return 2;
    } else {
        return 0;
    }
};

const mapStateToProps = (state) => ({
    activeTab: mapPathToTab(state.router.location.pathname)
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(authRequestsSlice.logout.actions.request())
});

export default connect(mapStateToProps, mapDispatchToProps);
