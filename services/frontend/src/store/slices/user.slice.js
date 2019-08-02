import {createSelector, createSlice} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

export const userSlice = createSlice({
    slice: mounts.user,
    initialState: {id: "", email: ""},
    reducers: {
        setUserId: (state, action) => {state.id = action.payload;},
        setUserEmail: (state, action) => {state.email = action.payload;},
        setUser: (state, action) => action.payload
    }
});

/* Extra Selectors */

const getUserId = createSelector(
    [userSlice.selectors.getUser],
    (user) => user.id
);

const getUserEmail = createSelector(
    [userSlice.selectors.getUser],
    (user) => user.email
);

userSlice.selectors = {
    ...userSlice.selectors,
    getUserId,
    getUserEmail
};

export const usersRequestsSlice = createRequestSlices(
    mounts.userRequests,
    ["fetchAll"]
);