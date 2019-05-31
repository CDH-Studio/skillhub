import {connect} from "react-redux";
import {authRequestsSlice} from "store/";

const errorMessageMap = (message) => {
    if (message === "Invalid login") {
        return "Wrong email or password";
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
    const loginState = authRequestsSlice.login.selectors.getState(state);

    return {
        errorMessage: errorMessageMap(loginState.error),
        isEmailInvalid: loginState.error === "Invalid email",
        isLoading: loginState.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLogin: (email, password) => dispatch(authRequestsSlice.login.actions.request({email, password}))
});

export default connect(mapStateToProps, mapDispatchToProps);
