import {createSlice} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

export const notificationSlice = createSlice({
    slice: mounts.notification,
    initialState: null,
    reducers: {
        pushNotification: (state, action) => action.payload,
    }
});

export const notificationRequestsSlice = createRequestSlices(
    mounts.notificationRequests,
    ["pushNotification"]
);