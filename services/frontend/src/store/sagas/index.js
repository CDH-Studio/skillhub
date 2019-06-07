import appSaga from "./app.sagas";
import authSaga from "./auth.sagas";
import projectsSaga from "./projects.sagas";
import skillsSaga from "./skills.sagas";
import profilesSaga from "./profiles.sagas"

const sagas = [appSaga, authSaga, projectsSaga, skillsSaga, profilesSaga];

const registerSagas = (middleware) => sagas.forEach((saga) => middleware.run(saga));

export default registerSagas;
