class Profile {
    /* Extracts the projectProfiles from the associated profile objects
     * and replaces the profiles as a top-level attribute of the project objects. */
    static processProfileSkills(profiles = []) {
        return profiles.map((profile) => {
            const processedProfile = {...profile};
            delete processedProfile.skills;

            processedProfile.profileSkills = profile.skills.reduce((acc, {profileSkills}) => {
                if (profileSkills) {
                    acc.push(profileSkills);
                }

                return acc;
            }, []);

            return processedProfile;
        });
    }

    static processProfilesSkills(profiles = []) {
        if (!Array.isArray(profiles)) {
            return this.processProfileSkills(profiles);
        }
        return profiles.map((profile) => (
            this.processProfileSkills(profile)
        ));
    }
}

module.exports = Profile;
