import {connect} from "react-redux";
import {
    profilesRequestsSlice,
} from "store/slices";

const mapStateToProps = (state) => ({
    error: profilesRequestsSlice.patchPersonalDetails.selectors.getError(state),
    isPatching: profilesRequestsSlice.patchPersonalDetails.selectors.getLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
    submitPersonalDetails: (id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle) => dispatch(
        profilesRequestsSlice.patchPersonalDetails.actions.request({
            id, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle
        })
    ),
    clearPatchError: () => dispatch(
        profilesRequestsSlice.patchPersonalDetails.actions.clear()
    )
});

export default connect(mapStateToProps, mapDispatchToProps);
