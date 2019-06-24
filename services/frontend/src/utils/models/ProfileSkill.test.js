import {Profile, ProfileSkill, Skill} from "utils/models";

const profile = new Profile({id: "1", profileSkills: ["a", "b"]});

const profilesById = {
    [profile.id]: profile,
};

const skill1 = new Skill();
const skill2 = new Skill();

const skillsById = {
    [skill1.id]: skill1,
    [skill2.id]: skill2
};

const profileSkill1 = new ProfileSkill({profileId: profile.id, skillId: skill1.id});
const profileSkill2 = new ProfileSkill({profileId: profile.id, skillId: skill2.id});

const profileSkillsById = {
    [profileSkill1.id]: profileSkill1,
    [profileSkill2.id]: profileSkill2
};

const profileSkillsByProfileId = {
    [profile.id]: [profileSkill1.id, profileSkill2.id]
};

const profileSkillsBySkillId = {
    [skill1.id]: [profileSkill1.id],
    [skill2.id]: [profileSkill2.id]
};

const profiles = [profile];
const skills = [skill1, skill2];
const profileSkills = [profileSkill1, profileSkill2];

describe("mapProfileIdToProfileSkills", () => {
    it("can map a profile ID to a list of profile skills", () => {
        expect(ProfileSkill.mapProfileIdToProfileSkills(
            profile.id, profileSkillsById, profileSkillsByProfileId
        )).toEqual(profileSkills);
    });

    it("returns an empty array when the profile ID is invalid", () => {
        expect(ProfileSkill.mapProfileIdToProfileSkills(
            "abc", profileSkillsById, profileSkillsByProfileId
        )).toEqual([]);
    });
});

describe("mapSkillIdToProfileSkills", () => {
    it("can map a skill ID to a list of profile skills", () => {
        expect(ProfileSkill.mapSkillIdToProfileSkills(
            skill1.id, profileSkillsById, profileSkillsBySkillId
        )).toEqual([profileSkill1]);
    });

    it("returns an empty array when the skill ID is invalid", () => {
        expect(ProfileSkill.mapSkillIdToProfileSkills(
            "abc", profileSkillsById, profileSkillsBySkillId
        )).toEqual([]);
    });
});

describe("mapProfileSkillsToProfiles", () => {
    it("can map a list of profile skills into a list of profiles", () => {
        expect(ProfileSkill.mapProfileSkillsToProfiles(
            profileSkills, profilesById
        )).toEqual(profiles);
    });

    it("returns an empty array when the no profile is found", () => {
        expect(ProfileSkill.mapProfileSkillsToProfiles(
            [new ProfileSkill()], profilesById
        )).toEqual([]);
    });
});

describe("mapProfileSkillsToSkills", () => {
    it("can map a list of profile skills into a list of skills", () => {
        expect(ProfileSkill.mapProfileSkillsToSkills(
            profileSkills, skillsById
        )).toEqual(skills);
    });

    it("returns an empty array when the no skill is found", () => {
        expect(ProfileSkill.mapProfileSkillsToSkills(
            [new ProfileSkill()], skillsById
        )).toEqual([]);
    });
});

