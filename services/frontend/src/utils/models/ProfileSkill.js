import uuidv4 from "uuid/v4";

export default class ProfileSkill {
    constructor({
        id = uuidv4(), profileId = null, skillId = null, isHighlySkilled = false,
        createdAt = new Date(), updatedAt = new Date()
    } = {}) {
        this.id = id;
        this.profileId = profileId;
        this.skillId = skillId;
        this.isHighlySkilled = isHighlySkilled;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
