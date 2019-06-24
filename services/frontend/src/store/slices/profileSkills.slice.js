import {createSelector, createSlice} from "redux-starter-kit";
import mounts from "store/mountpoints";

export const initialState = {
    // byId stores the whole ProfileSkill object, keyed by ID
    // i.e. {[id]: ProfileSkill}
    byId: {},
    // byProfileId stores references (lists of IDs) of ProfileSkills objects, keyed by their profileId
    // i.e. {[profileid]: [ProfileSkill.id]}
    byProfileId: {},
    // bySkillId stores references (lists of IDs) of ProfileSkills objects, keyed by their skillId
    // i.e. {[skillId]: [ProfileSkill.id]}
    bySkillId: {},
};

const addProfileSkillId = (state, action) => {
    // Expects an object like {foreignId: "", id: ""} as payload,
    // where 'foreignId' is a skillId,
    // and 'id' is a ProfileSkill ID
    const {payload} = action;
    const {id, foreignId} = payload;

    if (!state[foreignId]) {
        state[foreignId] = [];
    }

    if (!state[foreignId].includes(id)) {
        state[foreignId].push(id);
    }
};

const addProfileSkill = (state, action) => {
    const {payload} = action;
    const {id, profileId, skillId} = payload;

    state.byId[id] = payload;

    addProfileSkillId(state.bySkillId, {payload: {id, foreignId: skillId}});
    addProfileSkillId(state.byProfileId, {payload: {id, foreignId: profileId}});
};

export const profileSkillsSlice = createSlice({
    slice: mounts.profileSkills,
    initialState,
    reducers: {
        addProfileSkill,
        addProfileSkills: (state, action) => {
            action.payload.forEach((profileSkill) => addProfileSkill(state, {payload: profileSkill}));
        }
    }
});

const getById = createSelector(
    [profileSkillsSlice.selectors.getProfileSkills],
    (profileSkills) => profileSkills.byId
);

const getByProfileId = createSelector(
    [profileSkillsSlice.selectors.getProfileSkills],
    (profileSkills) => profileSkills.byProfileId
);

const getBySkillId = createSelector(
    [profileSkillsSlice.selectors.getProfileSkills],
    (profileSkills) => profileSkills.bySkillId
);

profileSkillsSlice.selectors = {
    ...profileSkillsSlice.selectors,
    getById,
    getByProfileId,
    getBySkillId
};