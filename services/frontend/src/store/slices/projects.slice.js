import {createSlice} from "redux-starter-kit";
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
