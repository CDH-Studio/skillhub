import uuidv4 from "uuid/v4";

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
    }) {
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
        return Profiles.reduce((acc, profile) => {
            const processedProfile = new Profile(profile);

            acc[processedProfile.id] = processedProfile;
            return acc;
        }, {});
    }

    //Iterate over profiles checking for the current user's id, then return that user's entire profile.
    static filterForCurrentUser(ProfilesById, currentUserId) {
        return ProfilesById[
            Object.keys(ProfilesById).filter((profileId) => (
                ProfilesById[profileId].userId === currentUserId
            ))[0]
        ];
    }
}