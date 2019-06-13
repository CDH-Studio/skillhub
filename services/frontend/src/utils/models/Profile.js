import uuidv4 from "uuid/v4";
import {arrayToObject} from "utils/helperFunctions";

export default class Profile {
    constructor({
        id = uuidv4(),
        name = "",
        primaryRole = "",
        contactEmail = "",
        phone = "",
        slackHandle = "",
        rocketChatHandle = "",
        userId = uuidv4(),
        createdAt = new Date(),
        updatedAt = new Date(),
    } = {}) {
        this.id = id;
        this.name = name;
        this.primaryRole = primaryRole;
        this.contactEmail = contactEmail;
        this.phone = phone;
        this.slackHandle = slackHandle;
        this.rocketChatHandle = rocketChatHandle;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /* Normalizes the list of Profiles that the API returns into a map of {ID -> Profile},
     * with the skills processed to just their IDs, for appropriate use in the Redux store. */
    static normalizeApiResultsForRedux(Profiles = []) {
        const processProfile = (profile) => new Profile(profile);
        return Profiles.reduce(arrayToObject(processProfile), {});
    }

    static findByUserId(userId, profiles = {}) {
        const filteredProfiles = Object.values(profiles).filter((profile) => profile.userId === userId);
        return (filteredProfiles.length > 0) ? filteredProfiles[0] : null;
    }

    // Iterate over profiles checking for the current user's id, then return that user's entire profile.
    static getUserProfile(profilesById, userId) {
        if (!profilesById || !userId) return null;

        const foundProfileIndex = Object.keys(profilesById).filter((profileId) =>
            profilesById[profileId].userId === userId
        ).join();

        return foundProfileIndex ? profilesById[foundProfileIndex] : null;

    }
}
