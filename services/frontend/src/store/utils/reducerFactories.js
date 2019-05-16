function objectReducerFactory(objectName) {
    return (state = {}, action = {}) => {
        switch (action.type) {
            case `${objectName}_ADD`:
                // falls through
            case `${objectName}_UPDATE`:
                return action.payload;
            default:
                return state;
        }
    };
}

function byIdReducerFactory(objectName, objectReducer) {
    return (state = {}, action = {}) => {
        const {payload} = action;

        switch (action.type) {
            case `${objectName}_UPDATE`:
                if (state[payload.id] === undefined) return state;
                // falls through
            case `${objectName}_ADD`:
                return Object.assign({}, state, {[payload.id]: objectReducer(state[payload.id], action)});
            case `${objectName}_DELETE`: {
                const newState = Object.assign({}, state);
                delete newState[payload.id];
                return newState;
            }
            default:
                return state;
        }
    };
}

function allIdsReducerFactory(objectName) {
    return (state = [], action = {}) => {
        const {payload} = action;

        switch (action.type) {
            case `${objectName}_ADD`:
                if (state.includes(payload.id)) return state;
                return [...state, payload.id];
            case `${objectName}_DELETE`:
                return state.filter((id) => id !== payload.id);
            default:
                return state;
        }
    };
}

export {
    objectReducerFactory,
    byIdReducerFactory,
    allIdsReducerFactory
};
