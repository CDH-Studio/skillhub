import {createSelector, createSlice} from "redux-starter-kit";
import mounts from "store/mountpoints";

const initialState = {
    // byId stores the whole ProjectProfile object, keyed by ID
    byId: {},
    // byProjectId stores references (lists of IDs) of ProjectProfile objects, keyed by their projectId
    byProjectId: {},
    // byProfileId stores references (lists of IDs) of ProjectProfile objects, keyed by their profileId
    byProfileId: {}
};

const addProjectProfile = (state, action) => {
    // Expects a ProjectProfile object as payload
    const {payload} = action;
    const {id, projectId, profileId} = payload;

    state.byId[id] = payload;

    if (!state.byProjectId[projectId]) {
        state.byProjectId[projectId] = [];
    }

    if (!state.byProfileId[profileId]) {
        state.byProfileId[profileId] = [];
    }

    if (!state.byProjectId[projectId].includes(id)) {
        state.byProjectId[projectId].push(id);
    }

    if (!state.byProfileId[profileId].includes(id)) {
        state.byProfileId[profileId].push(id);
    }
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

const getByProjectId = createSelector(
    [projectProfilesSlice.selectors.getProjectProfiles],
    (projectProfiles) => projectProfiles.byProjectId
);

const getByProfileId = createSelector(
    [projectProfilesSlice.selectors.getProjectProfiles],
    (projectProfiles) => projectProfiles.byProfileId
);

const getProjectsByProfile = (profileId) => createSelector(
    [getByProfileId],
    (byProfileId) => byProfileId[profileId]
);

const getProfilesByProject = (projectId) => createSelector(
    [getByProjectId],
    (byProjectId) => byProjectId[projectId]
);

projectProfilesSlice.selectors = {
    ...projectProfilesSlice.selectors,
    getById,
    getByProjectId,
    getByProfileId,
    getProjectsByProfile,
    getProfilesByProject
};
