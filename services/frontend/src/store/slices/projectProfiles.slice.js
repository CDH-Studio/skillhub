import {createSelector, createSlice} from "redux-starter-kit";
import mounts from "store/mountpoints";

export const initialState = {
    // byId stores the whole ProjectProfile object, keyed by ID
    // i.e. {[id]: ProjectProfile}
    byId: {},
    // byProfileId stores references (lists of IDs) of ProjectProfile objects, keyed by their profileId
    // i.e. {[profileId]: [ProjectProfile.id]}
    byProfileId: {},
    // byProjectId stores references (lists of IDs) of ProjectProfile objects, keyed by their projectId
    // i.e. {[projectId]: [ProjectProfile.id]}
    byProjectId: {}
};

/* Adds a projectProfile ID to one of the byProjectId or byProfileId states. */
const addProjectProfileId = (state, action) => {
    // Expects an object like {foreignId: "", id: ""} as payload,
    // where 'foreignId' is one of either a project ID or a profile ID,
    // and 'id' is a projectProfile ID
    const {payload} = action;
    const {id, foreignId} = payload;

    if (!state[foreignId]) {
        state[foreignId] = [];
    }

    if (!state[foreignId].includes(id)) {
        state[foreignId].push(id);
    }
};

const addProjectProfile = (state, action) => {
    // Expects a ProjectProfile object as payload
    const {payload} = action;
    const {id, projectId, profileId} = payload;

    state.byId[id] = payload;

    addProjectProfileId(state.byProfileId, {payload: {id, foreignId: profileId}});
    addProjectProfileId(state.byProjectId, {payload: {id, foreignId: projectId}});
};

export const projectProfilesSlice = createSlice({
    slice: mounts.projectProfiles,
    initialState,
    reducers: {
        addProjectProfile,
        addProjectProfiles: (state, action) => {
            // Expects a list of ProjectProfile objects as payload
            action.payload.forEach((projectProfile) => addProjectProfile(state, {payload: projectProfile}));
        }
    }
});

/* Extra Selectors */

const getById = createSelector(
    [projectProfilesSlice.selectors.getProjectProfiles],
    (projectProfiles) => projectProfiles.byId
);

const getByProfileId = createSelector(
    [projectProfilesSlice.selectors.getProjectProfiles],
    (projectProfiles) => projectProfiles.byProfileId
);

const getByProjectId = createSelector(
    [projectProfilesSlice.selectors.getProjectProfiles],
    (projectProfiles) => projectProfiles.byProjectId
);

projectProfilesSlice.selectors = {
    ...projectProfilesSlice.selectors,
    getById,
    getByProfileId,
    getByProjectId
};
