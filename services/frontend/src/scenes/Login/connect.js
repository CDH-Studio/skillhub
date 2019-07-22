import {connect} from "react-redux";
import {authRequestsSlice} from "store/";

const errorMessageMap = (error) => {
    if (error) {
        const message = error.message;
        if (message === "Validation error") {
            return "This user already exists";
        } else if (message === "Missing credentials") {
            return "Form cannot be empty";
        } else if (message === "Invalid email") {
            return "Invalid Email";
        } else {
            return message;
        }
    }
};

const checkInvalidEmail = (error) => {
    if (error && error.message === "Invalid email") {
        return true;
    }
};

const mapStateToProps = (state) => {
    const loginState = authRequestsSlice.login.selectors.getState(state);

    return {
        errorMessage: errorMessageMap(loginState.error),
        inInvalidEmail: checkInvalidEmail(loginState.error),
        isLoading: loginState.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLogin: (email, password) => dispatch(authRequestsSlice.login.actions.request({email, password}))
});

export default connect(mapStateToProps, mapDispatchToProps);
