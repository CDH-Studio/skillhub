import {call, put, take, takeLatest, takeEvery, race} from "redux-saga/effects";
import {createAction, createReducer, createSelector} from "redux-starter-kit";
import {routerActionTypes} from "./routerUtils";

const initialState = {loading: false, error: null};

// Want to clear the request's loading/error data whenever a route is changed,
// so that a user can't return to a page and find that a loader is still spinning,
// or that an error message is still being displayed.
const routerResetReducers = routerActionTypes.reduce((acc, actionType) => {
    acc[actionType] = (state, action) => initialState;  // eslint-disable-line
    return acc;
}, {});

/*  Creates a request slice with all of the actions, reducer, selectors, and saga wrapper
 *  necessary to model the state and make use of a single async request in Redux.
 *
 *  @param {string} mountpoint  Where the slice gets mounted in the Redux store
 *  @param {string} type        The type of request being performed by this request slice
 *
 *  @return {object}            The request slice with the following interface:
 *
 *      {
 *          slice: "${type}",
 *          reducer: (state, action) => state,
 *          actions: {
 *              `request`: (payload) => action,
 *              `success`: () => action,
 *              `failure`: (errorMessage) => action,
 *              `clear`: () => action
 *          },
 *          selectors: {
 *              getState: (state) => state,
 *              getLoading: (state) => state.loading,
 *              getError: (state) => state.error
 *          },
 *          watchRequestSaga: (saga) => saga
 *      }
 *
 *  Notes:
 *
 *      - The selector `get${mountpoint}${type}` has its capitalization modified to make sense.
 *          - e.g. given a mountpoint of 'authRequests' and a type of 'login',
 *            the selector would be 'getAuthRequestsLogin'.
 *
 *  Why this is being done:
 *
 *      In the general case, managing async requests usually requires at least
 *      3 states: 'request started', 'request succeeded', and 'request failed'.
 *      'clear' is used to reset the state back to its default values for situations
 *      other than 'request succeeded' eg. 'request cancelled'.
 *
 *      In terms of actual data, these 3 states usually mean that a 'loading' variable
 *      and an 'error' variable need to be stored somewhere for the UI to react to.
 *      This 'state' is either usually stored in Redux or in local React component state.
 *
 *      Since we need to be able to model the high-level state of uFincs all in Redux land
 *      (so that it is independent of the view layer), then we need to specifically
 *      manage 'request state' in Redux.
 *
 *      Following from this, it makes sense that since we'll likely have many requests,
 *      we'll need a common pattern to encapsulate the async request flow, otherwise
 *      there'll be a hundred and one slighly different implementations of how to call the API.
 *
 *      To that end, this 'request slice' factory takes in an 'type' string and
 *      creates a set of actions, reducers, and selectors that are all consistently
 *      named based on that 'type' string.
 *
 *      However, we also need to manage the transitions between each of the request's states.
 *      This is what the 'request saga' is for: it delegates the actual request logic
 *      to another saga that can be bound after the creation of 'request slice', but it augments
 *      the request logic with handling of the 'success' and 'failed' states. This way, the
 *      actual request logic is kept as simple as possible, and code duplication is minimized.
 *
 *      As such, only the `request` action is ever dispatched by the 'end user'
 *      (i.e. a React component).
 */
export const createRequestSlice = (mountpoint, type) => {
    // Create actions manually, as opposed to using createSlice, so that the action's type
    // doesn't have to be the same as the name of action creator.
    // This is relevant when creating multiple request slices; they can't all be typed as 'request',
    // but we do want to call the action creator as just 'request' (namespaced by the request type).
    const requestAction = createAction(`${mountpoint}/${type}/request`);
    const successAction = createAction(`${mountpoint}/${type}/success`);
    const failureAction = createAction(`${mountpoint}/${type}/failure`);
    const clearAction = createAction(`${mountpoint}/${type}/clear`);

    const reducer = createReducer(initialState, {
        ...routerResetReducers,  // Reset request state whenever the route changes
        [requestAction]: (state, action) => {  // eslint-disable-line
            state.loading = true;
            state.error = null;
        },
        [successAction]: (state, action) => initialState,  // eslint-disable-line
        [failureAction]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [clearAction]: (state, action) => initialState,  // eslint-disable-line
    });

    const mountpointSelector = `${mountpoint}.${type}`;

    const slice = {
        slice: type,
        reducer,
        actions: {
            request: requestAction,
            success: successAction,
            failure: failureAction,
            clear: clearAction
        },
        selectors: {
            getState: createSelector([mountpointSelector], (state) => state),
            getLoading: createSelector([mountpointSelector], (state) => state.loading),
            getError: createSelector([mountpointSelector], (state) => state.error)
        }
    };

    const requestSaga = (saga, routeChangeCancellable) => {
        let successCalled = false;

        const success = function*() {
            successCalled = true;
            yield put(successAction());
        };

        return function*(action) {
            try {
                if (routeChangeCancellable) {
                    yield race({
                        request: call(saga, action, success),
                        cancel: take(routerActionTypes)  // Cancel the request whenever the user navigates away
                    });
                } else {
                    yield call(saga, action, success);
                }

                if (!successCalled) {
                    yield call(success);
                }

                // Reset the flag for the next request
                successCalled = false;
            } catch (e) {
                yield put(failureAction(e.message));
            }
        };
    };

    slice.watchRequestSaga = (saga, {routeChangeCancellable = false, processEvery = true} = {}) => function*() {
        const effect = processEvery ? takeEvery : takeLatest;
        yield effect(requestAction, requestSaga(saga, routeChangeCancellable));
    };

    return slice;
};

/*  Creates a group of request slices that are mounted under a single mountpoint in the store.
 *
 *  @param {string} mountpoint           Where the 'master' request reducer is mounted in the store
 *  @param {Array<string>} requestTypes  The names of the types of requests that will be made
 *                                       (e.g. 'create', 'update', etc)
 *
 *  @return {object}                     The master group of request slices.
 *
 *      {
 *          slice: "${mountpoint}",
 *          reducer: (state, action) => state,
 *          [...requestTypes]: createRequestSlice
 *      }
 *
 *  Example usage:
 *
 *      - Input: ("authRequests", ["login", "signUp"])
 *
 *      - Output:
 *
 *          {
 *              slice: "authRequests",
 *              reducer: (state, action) => state,
 *              login: createRequestSlice,
 *              signUp: createRequestSlice
 *          }
 *
 *  Notes:
 *
 *      - The `reducer` is the combination of all the request type slice reducers. Using the above example,
 *        the reducer would expected to be mounted at "authRequests", and would produce the following default state:
 *
 *          {
 *              login: {
 *                  loading: false,
 *                  error: null
 *              },
 *              signUp: {
 *                  loading: false,
 *                  error: null
 *              }
 *          }
 */
const createRequestSlices = (mountpoint, requestTypes = []) => {
    const typeSlices = requestTypes.reduce((acc, type) => {
        acc[type] = createRequestSlice(mountpoint, type);
        return acc;
    }, {});

    const requestsReducer = (state = {}, action) => requestTypes.reduce((acc, type) => {
        acc[type] = typeSlices[type].reducer(acc[type], action);
        return acc;
    }, {...state});

    return {
        slice: mountpoint,
        reducer: requestsReducer,
        ...typeSlices
    };
};

export default createRequestSlices;
