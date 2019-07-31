import {createSelector, createSlice} from "redux-starter-kit";
import mounts from "store/mountpoints";

const initialState = {
    projectInfo: false,
    personalDetails: false,
    searchProject: false,
    roleInput: false
};

export const dialogsStateSlice = createSlice({
    slice: mounts.dialogsState,
    initialState,
    reducers: {
        setDialogState: (state, action) => {
            state[action.payload.dialog] = action.payload.dialogState;
        },
    }
});

/* Extra Selectors */
const getPersonalDetailsDialogState = createSelector(
    [dialogsStateSlice.selectors.getDialogsState],
    (dialogs) => dialogs.personalDetails
);

const getProjectInfoDialogState = createSelector(
    [dialogsStateSlice.selectors.getDialogsState],
    (dialogs) => dialogs.projectInfo
);

const getSearchProjectDialogState = createSelector(
    [dialogsStateSlice.selectors.getDialogsState],
    (dialogs) => dialogs.searchProject
);

const getRoleInputDialogState = createSelector(
    [dialogsStateSlice.selectors.getDialogsState],
    (dialogs) => dialogs.roleInput
);

dialogsStateSlice.selectors = {
    ...dialogsStateSlice.selectors,
    getPersonalDetailsDialogState,
    getProjectInfoDialogState,
    getSearchProjectDialogState,
    getRoleInputDialogState
};
