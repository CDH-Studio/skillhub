import uuidv4 from "uuid/v4";

export default class ProjectProfile {
    constructor({id = uuidv4(), projectId = null, profileId = null, role = ""}) {
        this.id = id;
        this.projectId = projectId;
        this.profileId = profileId;
        this.role = role;
    }
}
