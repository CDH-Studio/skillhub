export default class Contributor {
    constructor({
        name = "", role = "", profileId = "", projectId = ""
    } = {}) {
        this.name = name;
        this.role = role;
        this.projectId = projectId;
        this.profileId = profileId;
    }
}