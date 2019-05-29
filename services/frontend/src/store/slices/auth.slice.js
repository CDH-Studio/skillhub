import createRequestSlices from "store/utils/createRequestSlices";
import mounts from "store/mountpoints";

export const authRequestsSlice = createRequestSlices(mounts.authRequests, ["login", "signUp"]);
