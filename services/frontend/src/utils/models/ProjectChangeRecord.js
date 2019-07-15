import uuidv4 from "uuid/v4";

export default class ProjectChangeRecord {
    constructor({
        id = uuidv4(), projectId = "", userId = "",
        changedAttribute = "", createdAt = new Date(), updatedAt = new Date()
    } = {}) {
        this.id = id;
        this.projectId = projectId;
        this.userId = userId;
        this.changedAttribute = changedAttribute;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static mapProjectIdToProjectChangeRecords(projectId, byId, byProjectId) {
        return mapForeignIdToProjectChangeRecords(projectId, byId, byProjectId);
    }

    static mapSkillIdToProjectChangeRecords(userId, byId, byUserId) {
        return mapForeignIdToProjectChangeRecords(userId, byId, byUserId);
    }

    static mapProjectChangeRecordsToProjects(projectChangeRecords, projectsById) {
        return mapProjectChangeRecordsToForeignModel("projectId", projectChangeRecords, projectsById);
    }

    static mapProjectChangeRecordsToUsers(projectChangeRecords, usersById) {
        return mapProjectChangeRecordsToForeignModel("userId", projectChangeRecords, usersById);
    }
}

const mapForeignIdToProjectChangeRecords = (foreignId, byId, byForeignId) => {
    if (foreignId in byForeignId) {
        return byForeignId[foreignId].map((id) => byId[id]);
    }

    return [];
};

const mapProjectChangeRecordsToForeignModel = (foreignKey, projectChangeRecords, foreignModelsById) => {
    const addedIds = {};

    return projectChangeRecords.reduce((acc, {[foreignKey]: foreignId}) => {
        if (foreignId in foreignModelsById && !(foreignId in addedIds)) {
            acc = [...acc, foreignModelsById[foreignId]];
            addedIds[foreignId] = true;
        }

        return acc;
    }, []);
};