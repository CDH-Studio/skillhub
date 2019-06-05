import {createSlice} from "redux-starter-kit";
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
