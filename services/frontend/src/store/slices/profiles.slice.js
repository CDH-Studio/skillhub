import {createSlice} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

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

export const profilesRequestsSlice = createRequestSlices(mounts.profilesRequests, ["fetchAll"]);
