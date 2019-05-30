import authSaga from "./auth.sagas";

const sagas = [authSaga];

const registerSagas = (middleware) => sagas.forEach((saga) => middleware.run(saga));

export default registerSagas;
