import {createSlice} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

export const projectChangeRecordsSlice = createSlice({
    slice: mounts.projectChangeRecords,
    initialState: {},
    reducers: {
        setProjectChangeRecords: (state, action) => action.payload,
        setProjectChangeRecord: (state, action) => {
            // Expects a Project object as payload
            state[action.payload.id] = action.payload;
        },
    }
});

export const projectChangeRecordsRequestsSlice = createRequestSlices(
    mounts.projectChangeRecordsRequests,
    ["fetchAll", "addProjectChangeRecord"]
);
