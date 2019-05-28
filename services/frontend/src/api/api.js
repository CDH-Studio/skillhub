import axios from "axios";
import feathers from "@feathersjs/client";
import {BACKEND_URL} from "config";
import auth from "./auth";
import bindServices from "./bindServices";

const rest = feathers.rest(BACKEND_URL).axios(axios);

const api = feathers();

api.configure(rest);
api.configure(auth);

bindServices(api);

export default api;
