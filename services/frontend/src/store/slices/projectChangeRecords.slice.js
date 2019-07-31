import {createSelector, createSlice} from "redux-starter-kit";
import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

export const initialState = {
    // byId stores the whole ProjectChangeRecord object, keyed by ID
    // i.e. {[id]: ProjectChangeRecord}
    byId: {},
    // byUserId stores references (lists of IDs) of ProjectChangeRecord objects, keyed by their userId
    // i.e. {[userId]: [projectChangeRecord.id]}
    byUserId: {},
    // byProjectId stores references (lists of IDs) of ProjectChangeRecord objects, keyed by their projectId
    // i.e. {[projectId]: [projectChangeRecord.id]}
    byProjectId: {}
};

/* Adds a projectChangeRecord ID to one of the byProjectId or byUserId states. */
const addProjectChangeRecordId = (state, action) => {
    // Expects an object like {foreignId: "", id: ""} as payload,
    // where 'foreignId' is one of either a project ID or a user ID,
    // and 'id' is a projectChangeRecord ID
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
    // Expects a projectChangeRecord object as payload
    const {payload} = action;
    const {id, projectId, userId} = payload;

    state.byId[id] = payload;

    addProjectChangeRecordId(state.byUserId, {payload: {id, foreignId: userId}});
    addProjectChangeRecordId(state.byProjectId, {payload: {id, foreignId: projectId}});
};

export const projectChangeRecordsSlice = createSlice({
    slice: mounts.projectChangeRecords,
    initialState,
    reducers: {
        addProjectChangeRecord,
        addProjectChangeRecords: (state, action) => {
            // Expects a list of ProjectProfile objects as payload
            action.payload.forEach((projectChangeRecord) => addProjectChangeRecord(
                state, {payload: projectChangeRecord
                }
            ));
        }
    }
});

const getById = createSelector(
    [projectChangeRecordsSlice.selectors.getProjectChangeRecords],
    (projectChangeRecords) => projectChangeRecords.byId
);

const getByUserId = createSelector(
    [projectChangeRecordsSlice.selectors.getProjectChangeRecords],
    (projectChangeRecords) => projectChangeRecords.byUserId
);

const getByProjectId = createSelector(
    [projectChangeRecordsSlice.selectors.getProjectChangeRecords],
    (projectChangeRecords) => projectChangeRecords.byProjectId
);

projectChangeRecordsSlice.selectors = {
    ...projectChangeRecordsSlice.selectors,
    getById,
    getByUserId,
    getByProjectId
};

export const projectChangeRecordsRequestsSlice = createRequestSlices(
    mounts.projectChangeRecordsRequests,
    ["fetchAll"]
);
