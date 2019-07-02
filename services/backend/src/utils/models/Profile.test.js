const Profile = require("./Profile");

describe("processProfilesSkills", () => {
    it("takes just the profileSkills and removes the skill data", () => {
        const profiles = [
            // Multiple profiles at once
            {skills: [{profileSkills: {id: "1"}}, {profileSkills: {id: "3"}}]},
            // Just one profile
            {skills: [{profileSkills: {id: "2"}}]},
            // Somehow, there are is a profile with no associated projectProfile
            {skills: [{}]},
            // There are no profiles
            {skills: []}
        ];

        const processedProfiles = [
            {profileSkills: [{id: "1"}, {id: "3"}]},
            {profileSkills: [{id: "2"}]},
            {profileSkills: []},
            {profileSkills: []}
        ];

        expect(Profile.processProfilesSkills(profiles)).toEqual(processedProfiles);
    });

    it("returns an empty array when there are no projects to process", () => {
        expect(Profile.processProfilesSkills()).toEqual([]);
        expect(Profile.processProfilesSkills([])).toEqual([]);
    });
});
