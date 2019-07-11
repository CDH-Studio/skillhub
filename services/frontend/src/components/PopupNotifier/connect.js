import {connect} from "react-redux";
import {notificationSlice} from "store/slices";

const mapStateToProps = (state) => {
    return {
        notification: (notificationSlice.selectors.getNotification(state))
    };
};

export default connect(mapStateToProps, null);
