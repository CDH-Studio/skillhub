import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import {configureStore} from "redux-starter-kit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";

import mounts from "./mountpoints";
import registerSagas from "./sagas";
import createRootReducer from "./rootReducer";

const persistConfig = {
    key: "skillhub",
    storage,
    whitelist: [mounts.profiles, mounts.projects, mounts.skills, mounts.user]
};

export const history = createBrowserHistory({forceRefresh: false});

export default () => {
    const reducer = createRootReducer(history);

    const sagaMiddleware = createSagaMiddleware();
    const middleware = [thunkMiddleware, sagaMiddleware, routerMiddleware(history)];

    const preloadedState = {};

    const store = configureStore({
        reducer: persistReducer(persistConfig, reducer),
        middleware,
        preloadedState,
        devTools: true
    });

    const persistor = persistStore(store);

    registerSagas(sagaMiddleware);

    return {store, persistor};
};
