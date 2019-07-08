import appSaga from "./app.sagas";
import authSaga from "./auth.sagas";
import notificationSaga from "./notification.sagas";
import profilesSaga from "./profiles.sagas";
import projectsSaga from "./projects.sagas";
import skillsSaga from "./skills.sagas";

const sagas = [appSaga, authSaga, notificationSaga, profilesSaga, projectsSaga, skillsSaga];

const registerSagas = (middleware) => sagas.forEach((saga) => middleware.run(saga));

export default registerSagas;
