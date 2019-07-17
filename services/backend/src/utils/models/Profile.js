class Profile {
    /* Extracts the profileSkills from the associated profile object
     * and replaces the skills as a top-level attribute of the profile object. */
    static processProfileSkills(profile) {
        const processedProfile = {...profile};
        delete processedProfile.skills;

        processedProfile.profileSkills = profile.skills.reduce((acc, {profileSkills}) => {
            if (profileSkills) {
                acc.push(profileSkills);
            }

            return acc;
        }, []);

        return processedProfile;
    }

    /* Takes in an array of profiles or a single profile and returns an array of processed
     * profiles or a single processed profile object */
    static processProfilesSkills(profiles = []) {
        if (!Array.isArray(profiles)) {
            return this.processProfileSkills(profiles);
        }
        else {
            return profiles.map((profile) => (
                this.processProfileSkills(profile)
            ));
        }
    }
}

module.exports = Profile;
