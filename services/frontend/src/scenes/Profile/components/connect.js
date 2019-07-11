import {connect} from "react-redux";
import {
    notificationSlice, profilesRequestsSlice,
} from "store/slices";

const mapStateToProps = (state) => ({
    error: profilesRequestsSlice.patchPersonalDetails.selectors.getError(state),
    isLoading: profilesRequestsSlice.patchPersonalDetails.selectors.getLoading(state),
    notif: notificationSlice.selectors.getNotification(state)
});

const mapDispatchToProps = (dispatch) => {
    return {
        submitPersonalDetails: (id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle) => dispatch(
            profilesRequestsSlice.patchPersonalDetails.actions.request({
                id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle
            })
        ),
        clearPatchError: () => dispatch(
            profilesRequestsSlice.patchPersonalDetails.actions.clear()
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps);
