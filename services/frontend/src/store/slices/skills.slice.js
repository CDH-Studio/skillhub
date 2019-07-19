import {createSlice} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

export const skillsSlice = createSlice({
    slice: mounts.skills,
    initialState: {},
    reducers: {
        setSkills: (state, action) => action.payload,
        addSkill: (state, action) => {
            // Expects a Skill object as payload
            state[action.payload.id] = action.payload;
        }
    }
});

export const skillsRequestsSlice = createRequestSlices(mounts.skillsRequests, ["fetchAll", "addNewSkill"]);
