import {createSlice, createSelector} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import {Profile} from "utils/models";
import mounts from "store/mountpoints";
import {userSlice} from "./user.slice";

export const profilesSlice = createSlice({
    slice: mounts.profiles,
    initialState: {},
    reducers: {
        setProfiles: (state, action) => action.payload,
        addProfile: (state, action) => {
            // Expects a Profile object as payload
            state[action.payload.id] = action.payload;
        }
    }
});

profilesSlice.selectors.getCurrentUserProfile = createSelector(
    [profilesSlice.selectors.getProfiles, userSlice.selectors.getUserId],
    (profilesById, currentUserId) => Profile.filterForCurrentUser(profilesById, currentUserId)
);
<<<<<<< Updated upstream
=======
/*
profilesSlice.selectors.getCurrentUserProfile = {
    "getCurrentUserProfile": getCurrentUserProfile
};
console.log(profilesSlice)
*/
>>>>>>> Stashed changes

export const profilesRequestsSlice = createRequestSlices(mounts.profilesRequests, ["fetchAll"]);
