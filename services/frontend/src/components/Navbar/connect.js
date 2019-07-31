import {connect} from "react-redux";
import {authRequestsSlice} from "store/";
import ScreenUrls from "utils/screenUrls";

const mapPathToTab = (path) => {
    if (path.includes(ScreenUrls.PROFILE)) {
        return 0;
    } else if (path.includes(ScreenUrls.PEOPLE)) {
        return 1;
    } else if (path.includes(ScreenUrls.PROJECTS)) {
        return 2;
    } else if (path.includes(ScreenUrls.SEARCH)) {
        return 3;
    } else {
        return null;
    }
};

const mapStateToProps = (state) => ({
    activeTab: mapPathToTab(state.router.location.pathname)
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(authRequestsSlice.logout.actions.request())
});

export default connect(mapStateToProps, mapDispatchToProps);
