import {connect} from "react-redux";
import {authRequestsSlice} from "store/";

const mapStateToProps = (state) => {
    const signUpState = authRequestsSlice.signUp.selectors.getState(state);
    const loginLoading = authRequestsSlice.login.selectors.getLoading(state);

    return {
        error: signUpState.error,
        isLoading: signUpState.loading || loginLoading  // Want spinner to keep going while user gets logged in
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSignUp: (email, password) => dispatch(authRequestsSlice.signUp.actions.request({email, password}))
});

export default connect(mapStateToProps, mapDispatchToProps);
