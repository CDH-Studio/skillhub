import {connect} from "react-redux";
import {
    userSlice, profilesRequestsSlice
} from "store/slices";

const mapStateToProps = (state) => {
    const createProfileState = profilesRequestsSlice.createProfile.selectors.getState(state);

    return {
        user: userSlice.selectors.getUser(state),
        error: createProfileState.error,
        isLoading: createProfileState.isLoading
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (id, userId, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle) => dispatch(
        profilesRequestsSlice.createProfile.actions.request({
            id, userId, name, contactEmail, primaryRole, phone, slackHandle, rocketChatHandle
        })
    )
});
export default connect(mapStateToProps, mapDispatchToProps);