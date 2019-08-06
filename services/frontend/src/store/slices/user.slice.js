import {createSelector, createSlice} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

// Slice for handling the current user
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

// Slice handling all of the users in skillhub
export const usersSlice = createSlice({
    slice: mounts.users,
    initialState: {},
    reducers: {
        setUsers: (state, action) => action.payload,
        setUser: (state, action) => {
            // Expects a Project object as payload
            state[action.payload.id] = action.payload;
        },
    }
});

export const usersRequestsSlice = createRequestSlices(
    mounts.usersRequests,
    ["fetchAll"]
);