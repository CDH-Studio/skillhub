import {createSelector, createSlice} from "redux-starter-kit";
import mounts from "store/mountpoints";

export const initialState = {
    // byId stores the whole changeRecord object, keyed by ID
    // i.e. {[id]: ProjectChangeRecord}
    byId: {},
    // byProjectId stores references (lists of IDs) of ProjectChangeRecord objects, keyed by their projectId
    // i.e. {[projectId]: [ProjectChangeRecord.id]}
    byProjectId: {},
    // byUserId stores references (lists of IDs) of ProjectChangeRecord objects, keyed by their userId
    // i.e. {[userId]: [ProjectChangeRecord.id]}
    byUserId: {},
};

const addProjectChangeRecordId = (state, action) => {
    // Expects an object like {foreignId: "", id: ""} as payload,
    // where 'foreignId' is a Project ID or User ID,
    // and 'id' is a ProjectChangeRecord ID
    const {payload} = action;
    const {id, foreignId} = payload;

    if (!state[foreignId]) {
        state[foreignId] = [];
    }

    if (!state[foreignId].includes(id)) {
        state[foreignId].push(id);
    }
};

const addProjectChangeRecord = (state, action) => {
    // Expects a ProjectProfile object as payload
    const {payload} = action;
    const {id, projectId, userId} = payload;

    state.byId[id] = payload;

    addProjectChangeRecordId(state.byProjectId, {payload: {id, foreignId: projectId}});
    addProjectChangeRecordId(state.byUserId, {payload: {id, foreignId: userId}});
};

export const projectChangeRecordsSlice = createSlice({
    slice: mounts.projectChangeRecords,
    initialState,
    reducers: {
        addProjectChangeRecord,
        addProjectChangeRecords: (state, action) => {
            action.payload.forEach((projectChangeRecord) =>
                addProjectChangeRecord(state, {payload: projectChangeRecord}));
        }
    }
});

const getById = createSelector(
    [projectChangeRecordsSlice.selectors.getProjectChangeRecords],
    (projectChangeRecords) => projectChangeRecords.byId
);

const getByProjectId = createSelector(
    [projectChangeRecordsSlice.selectors.getProjectChangeRecords],
    (projectChangeRecords) => projectChangeRecords.byProjectjId
);

const getByUserId = createSelector(
    [projectChangeRecordsSlice.selectors.getProjectChangeRecords],
    (projectChangeRecords) => projectChangeRecords.byUserId
);

projectChangeRecordsSlice.selectors = {
    ...projectChangeRecordsSlice.selectors,
    getById,
    getByProjectId,
    getByUserId
};