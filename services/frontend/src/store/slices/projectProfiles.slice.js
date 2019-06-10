import {createSelector, createSlice} from "redux-starter-kit";
import mounts from "store/mountpoints";

const initialState = {
    // byId stores the whole ProjectProfile object, keyed by ID
    byId: {},
    // byProjectId stores references (IDs) of ProjectProfile objects, keyed by their projectId
    byProjectId: {},
    // byProfileId stores references (IDs) of ProjectProfile objects, keyed by their profileId
    byProfileId: {}
};

const addProjectProfile = (state, action) => {
    // Expects a ProjectProfile object as payload
    const {payload} = action;
    const {id, projectId, profileId} = payload;

    state.byId[id] = payload;
    state.byProjectId[projectId] = id;
    state.byProfileId[profileId] = id;
};

export const projectProfilesSlice = createSlice({
    slice: mounts.projectProfiles,
    initialState,
    reducers: {
        addProjectProfile,
        addProjectProfiles: (state, action) => {
            // Expects a list of ProjectProfile objects as payload
            action.payload.forEach((projectProfile) => addProjectProfile(state, projectProfile));
        }
    }
});

const getById = createSelector(
    [projectProfilesSlice.selectors.getProjectProfiles],
    (projectProfiles) => projectProfiles.byId
);

const getByProjectId = createSelector(
    [projectProfilesSlice.selectors.getProjectProfiles],
    (projectProfiles) => projectProfiles.byProjectId
);

const getByProfileId = createSelector(
    [projectProfilesSlice.selectors.getProjectProfiles],
    (projectProfiles) => projectProfiles.byProfileId
);

projectProfilesSlice.selectors = {
    ...projectProfilesSlice.selectors,
    getById,
    getByProjectId,
    getByProfileId
};