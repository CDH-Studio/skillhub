import uuidv4 from "uuid/v4";
import {arrayToObject} from "utils/helperFunctions";
const EMAIL_REGEX = /^\S+@\S+$/;

export default class User {
    constructor({
        id = uuidv4(),
        name = ""
    }) {
        this.id = id;
        this.name = name;
    }

    static validateInfo(email, password) {
        if (!email || !password) {
            throw new Error("Missing credentials");
        }

        if (!EMAIL_REGEX.test(email)) {
            throw new Error("Invalid email");
        }
    }

    static normalizeApiResultsForRedux(projects = []) {
        return projects.reduce(arrayToObject(), {});
    }
}