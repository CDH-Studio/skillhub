import {createSlice} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

export const projectsSlice = createSlice({
    slice: mounts.projects,
    initialState: {},
    reducers: {
        setProjects: (state, action) => action.payload,
        addProject: (state, action) => {
            // Expects a Project object as payload
            state[action.payload.id] = action.payload;
        }
    }
});

export const projectsRequestsSlice = createRequestSlices(mounts.projectsRequests, ["fetchAll"]);
