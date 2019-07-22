import uuidv4 from "uuid/v4";
import {arrayToObject} from "utils/helperFunctions";

export default class ProjectChangeRecord {
    constructor({
        id = uuidv4(), projectId = "", userId = "", changedAttribute = "",
        oldValue = "", newValue = "", createdAt = new Date(), updatedAt = new Date()
    } = {}) {
        this.id = id;
        this.projectId = projectId;
        this.userId = userId;
        this.changedAttribute = changedAttribute;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static normalizeProjectChangeRecord = (projectChangeRecord) => {
        return new ProjectChangeRecord(projectChangeRecord);
    };

    /* Normalizes the list of profiles that the API returns into a map of {ID -> Profile},
     * with the skills processed to just their IDs, for appropriate use in the Redux store. */
    static normalizeApiResultsForRedux(projectChangeRecords) {
        return projectChangeRecords.reduce(arrayToObject({processor: this.normalizeProjectChangeRecord}), {});
    }
}