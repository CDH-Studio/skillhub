import {createRequestSlices} from "store/utils";
import mounts from "store/mountpoints";

export const authRequestsSlice = createRequestSlices(mounts.authRequests, ["login", "signUp", "logout"]);
