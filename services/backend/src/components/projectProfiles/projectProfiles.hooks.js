const {authenticate} = require("@feathersjs/authentication").hooks;

const preventBulkDuplication = () => async (context) => {
    const {data: projectProfiles} = context;

    // This hook is only for handling duplication detection when doing a bulk (i.e. array) create
    if (!Array.isArray(projectProfiles)) {
        return context;
    }

    const projectProfilesService = context.app.service("projectProfiles");

    const projectIds = projectProfiles.map(({projectId}) => projectId);
    const profileIds = projectProfiles.map(({profileId}) => profileId);

    const existingProjectProfiles = await projectProfilesService.find({
        query: {
            $and: [
                {projectId: {$in: projectIds}},
                {profileId: {$in: profileIds}}
            ]
        }
    });

    if (projectProfiles.length !== existingProjectProfiles.length) {
        const indexedProjectProfiles = existingProjectProfiles.reduce((acc, {projectId, profileId}) => {
            if (projectId in acc) {
                acc[projectId] = {
                    ...acc[projectId],
                    profileId
                };
            } else {
                acc[projectId] = {profileId};
            }

            return acc;
        }, {});

        const projectProfilesToAdd = projectProfiles.filter(({projectId, profileId}) => {
            if (!(projectId in indexedProjectProfiles)) {
                return true;
            } else {
                if (!(profileId in indexedProjectProfiles[projectId])) {
                    return true;
                }
            }

            return false;
        });

        context.data = projectProfilesToAdd;
    } else {
        // Empty out the data so that Feathers doesn't bother actually trying to create any projectProfiles
        context.data = [];
    }

    return context;
};

module.exports = {
    before: {
        all: [authenticate("jwt")],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
