import {push} from "react-router-redux";

export const relativePush = (urlToAppend) => (dispatch, getState) => {
    dispatch(push(getState().router.location.pathname + urlToAppend));
};
