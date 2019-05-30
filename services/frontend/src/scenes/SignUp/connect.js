import {connect} from "react-redux";
import {authRequestsSlice} from "store/";

const errorMessageMap = (message) => {
    if (message === "Validation error") {
        return "This user already exists";
    } else if (message === "Missing credentials") {
        return "Form cannot be empty";
    } else if (message === "Invalid email") {
        // Ignore invalid email messages in favour of the `isEmailInvalid` prop
        return null;
    } else {
        return message;
    }
};

const mapStateToProps = (state) => {
    const signUpState = authRequestsSlice.signUp.selectors.getState(state);
    const loginLoading = authRequestsSlice.login.selectors.getLoading(state);

    return {
        errorMessage: errorMessageMap(signUpState.error),
        isEmailInvalid: signUpState.error === "Invalid email",
        isLoading: signUpState.loading || loginLoading  // Want spinner to keep going while user gets logged in
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSignUp: (email, password) => dispatch(authRequestsSlice.signUp.actions.request({email, password}))
});

export default connect(mapStateToProps, mapDispatchToProps);
