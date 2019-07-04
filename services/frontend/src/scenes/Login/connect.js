import {connect} from "react-redux";
import {authRequestsSlice} from "store/";

const mapStateToProps = (state) => {
    const loginState = authRequestsSlice.login.selectors.getState(state);

    return {
        error: loginState.error,
        isLoading: loginState.loading
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLogin: (email, password) => dispatch(authRequestsSlice.login.actions.request({email, password}))
});

export default connect(mapStateToProps, mapDispatchToProps);
