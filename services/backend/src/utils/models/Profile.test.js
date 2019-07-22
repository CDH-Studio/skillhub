const Profile = require("./Profile");

describe("liftProfilesSkills", () => {
    it("takes just the profileSkills and removes the skill data from an array of profiles", () => {
        const profiles = [
            // Multiple profileSkills at once
            {skills: [{profileSkills: {id: "1"}}, {profileSkills: {id: "3"}}]},
            // Just one profilesSkill
            {skills: [{profileSkills: {id: "2"}}]},
            // Somehow, there are is a skill with no associated profileSkill
            {skills: [{}]},
            // There are no profileSkills
            {skills: []}
        ];

        const processedProfiles = [
            {profileSkills: [{id: "1"}, {id: "3"}]},
            {profileSkills: [{id: "2"}]},
            {profileSkills: []},
            {profileSkills: []}
        ];

        expect(Profile.liftProfilesSkills(profiles)).toEqual(processedProfiles);
    });

    it("takes just the profileSkills and removes the skill data from a single profile", () => {
        const profile = {skills: [{profileSkills: {id: "1"}}, {profileSkills: {id: "3"}}]};
        const processedProfile = {profileSkills: [{id: "1"}, {id: "3"}]};

        expect(Profile.liftProfilesSkills(profile)).toEqual(processedProfile);
    });

    it("returns an empty array when there are no projects to process", () => {
        expect(Profile.liftProfilesSkills()).toEqual([]);
        expect(Profile.liftProfilesSkills([])).toEqual([]);
    });
});
