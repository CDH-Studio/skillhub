import uuidv4 from "uuid/v4";

export default class ProjectProfile {
    constructor({
        id = uuidv4(), projectId = null, profileId = null, role = "",
        createdAt = new Date(), updatedAt = new Date()
    } = {}) {
        this.id = id;
        this.projectId = projectId;
        this.profileId = profileId;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static mapProfileIdToProjectProfiles(profileId, byId, byProfileId) {
        return mapForeignIdToProjectProfiles(profileId, byId, byProfileId);
    }

    static mapProjectIdToProjectProfiles(projectId, byId, byProjectId) {
        return mapForeignIdToProjectProfiles(projectId, byId, byProjectId);
    }

    static mapProjectProfilesToProfiles(projectProfiles, profilesById) {
        return mapProjectProfilesToForeignModel("profileId", projectProfiles, profilesById);
    }

    static mapProjectProfilesToProjects(projectProfiles, projectsById) {
        return mapProjectProfilesToForeignModel("projectId", projectProfiles, projectsById);
    }

    static mapProfileToProjects(
        profile = {}, projectsById = {}, projectProfilesById = {}, projectProfilesByProfileId = {}
    ) {
        if (!profile || !(profile.id in projectProfilesByProfileId)) {
            return [];
        }

        const projectProfiles = ProjectProfile.mapProfileIdToProjectProfiles(
            profile.id, projectProfilesById, projectProfilesByProfileId
        );

        return ProjectProfile.mapProjectProfilesToProjects(projectProfiles, projectsById);
    }

    static mapProfileToUnrelatedProjects(projectsById = [], profileProjects = []) {
        return projectsById.filter((project) => (
            !(profileProjects.includes(project))
        ));
    }
}

const mapForeignIdToProjectProfiles = (foreignId, byId, byForeignId) => {
    if (foreignId in byForeignId) {
        return byForeignId[foreignId].map((id) => byId[id]);
    }

    return [];
};

const mapProjectProfilesToForeignModel = (foreignKey, projectProfiles, foreignModelsById) => {
    const addedIds = {};

    return projectProfiles.reduce((acc, {[foreignKey]: foreignId}) => {
        if (foreignId in foreignModelsById && !(foreignId in addedIds)) {
            acc = [...acc, foreignModelsById[foreignId]];
            addedIds[foreignId] = true;
        }

        return acc;
    }, []);
};

