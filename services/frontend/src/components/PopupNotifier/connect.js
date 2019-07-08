import {connect} from "react-redux";
import {notificationSlice, notificationRequestsSlice} from "store/slices";

const mapStateToProps = (state) => {
    return {

        isLoading: (notificationRequestsSlice.pushNotification.selectors.getLoading(state)),
        notification: (notificationSlice.selectors.getNotification(state))
    };
};

export default connect(mapStateToProps, null);
