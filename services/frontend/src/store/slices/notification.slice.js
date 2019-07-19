import {createSlice} from "redux-starter-kit";
import mounts from "store/mountpoints";

export const notificationSlice = createSlice({
    slice: mounts.notification,
    initialState: null,
    reducers: {
        setNotification: (state, action) => action.payload,
    }
});
