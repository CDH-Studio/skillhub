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

    static mapProfileIdToProfileSkills(profileId, byId, byProfileId) {
        return mapForeignIdToProfileSkills(profileId, byId, byProfileId);
    }

    static mapSkillIdToProfileSkills(skillId, byId, bySkillId) {
        return mapForeignIdToProfileSkills(skillId, byId, bySkillId);
    }

    static mapProfileSkillsToProfiles(profileSkills, profilesById) {
        return mapProfileSkillsToForeignModel("profileId", profileSkills, profilesById);
    }

    static mapProfileSkillsToSkills(profileSkills, skillsById) {
        return mapProfileSkillsToForeignModel("skillId", profileSkills, skillsById);
    }
}

const mapForeignIdToProfileSkills = (foreignId, byId, byForeignId) => {
    if (foreignId in byForeignId) {
        return byForeignId[foreignId].map((id) => byId[id]);
    }

    return [];
};

const mapProfileSkillsToForeignModel = (foreignKey, profileSkills, foreignModelsById) => {
    const addedIds = {};

    return profileSkills.reduce((acc, {[foreignKey]: foreignId}) => {
        if (foreignId in foreignModelsById && !(foreignId in addedIds)) {
            acc = [...acc, foreignModelsById[foreignId]];
            addedIds[foreignId] = true;
        }

        return acc;
    }, []);
};

