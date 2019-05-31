import {connect} from "react-redux";
import {authRequestsSlice} from "store/";

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(authRequestsSlice.logout.actions.request())
});

export default connect(null, mapDispatchToProps);
