import {createSlice, createSelector} from "redux-starter-kit";
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

userSlice.selectors.getUserId = createSelector(
    [userSlice.selectors.getUser],
    (currentUser) => currentUser.id
);
