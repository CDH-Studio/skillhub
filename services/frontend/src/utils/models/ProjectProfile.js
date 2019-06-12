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
        return byProfileId[profileId].map((id) => byId[id]);
    }

    static mapProjectIdToProjectProfiles(projectId, byId, byProjectId) {
        return byProjectId[projectId].map((id) => byId[id]);
    }

    static mapProjectProfilesToProfiles(projectProfiles, profilesById) {
        return mapProjectProfilesToModel("profileId", projectProfiles, profilesById);
    }

    static mapProjectProfilesToProjects(projectProfiles, projectsById) {
        return mapProjectProfilesToModel("projectId", projectProfiles, projectsById);
    }
}

const mapProjectProfilesToModel = (foreignKey, projectProfiles, associatedModelsById) => (
    projectProfiles.reduce((acc, {[foreignKey]: foreignId}) => {
        if (foreignId in associatedModelsById) {
            acc = [...acc, associatedModelsById[foreignId]];
        }

        return acc;
    }, [])
);

