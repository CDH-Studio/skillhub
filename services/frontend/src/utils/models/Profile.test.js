import {Profile, ProfileSkill, Skill} from "utils/models";

/* Mock the date so "createdAt" and "updatedAt" properties will not be invalid if created at different times */
const realDate = Date;
const constantDate = new Date("2019-01-01T12:00:00");

global.Date = class extends Date {
    constructor () {
        return constantDate;
    }
};

/* Set the date object back to it's normal value */
afterAll(() => {
    global.Date = realDate;
});

describe("normalizeApiResultsForRedux", () => {
    const ProfilesList = [
        new Profile({id: "1", profileSkills: [{id: "a"}, {id: "b"}]}),
        new Profile({id: "2", profileSkills: [{id: "c"}, {id: "z"}]}),
        new Profile({id: "3", profileSkills: []}),
        new Profile({id: "4", profileSkills: null})
    ];

    const ProfilesMap = {
        [ProfilesList[0].id]: {...ProfilesList[0], profileSkills: ["a", "b"]},
        [ProfilesList[1].id]: {...ProfilesList[1], profileSkills: ["c", "z"]},
        [ProfilesList[2].id]: {...ProfilesList[2], profileSkills: []},
        [ProfilesList[3].id]: {...ProfilesList[3], profileSkills: []}
    };

    it("normalizes a list of Profiles to a map of Profiles with just profileSkill IDs", () => {
        expect(Profile.normalizeApiResultsForRedux(ProfilesList)).toEqual(ProfilesMap);
    });
});

describe("extractProfileSkills", () => {
    const profiles = [
        new Profile({profileSkills: [{id: "1"}, {id: "2"}]}),
        new Profile({profileSkills: [{id: "3"}]}),
        new Profile({profileSkills: []}),
        new Profile()
    ];

    const profileSkills = [{id: "1"}, {id: "2"}, {id: "3"}];

    it("extracts the lists of each project's profileSkills into one list of profileSkills", () => {
        expect(Profile.extractProfileSkills(profiles)).toEqual(profileSkills);
    });

    it("returns an empty array when given no input", () => {
        expect(Profile.extractProfileSkills()).toEqual([]);
        expect(Profile.extractProfileSkills([])).toEqual([]);
    });
});

describe("getUserProfile", () => {
    const allProfiles = [
        new Profile({id: "1", name: "bill", userId: "1"}),
        new Profile({id: "2", contactEmail: "fred@gmail.com", userId: "2"}),
        new Profile({id: "3", phone: "9051142315", userId: "3"})
    ];

    it("returns a users profile when passed a userId in the database", () => {
        expect(Profile.getUserProfile(allProfiles, "1")).toEqual(allProfiles[0]);
        expect(Profile.getUserProfile(allProfiles, "2")).toEqual(allProfiles[1]);
        expect(Profile.getUserProfile(allProfiles, "3")).toEqual(allProfiles[2]);
    });

    it("returns null when there is no user by that id", () => {
        expect(Profile.getUserProfile(allProfiles, "fakeId")).toEqual(null);
        expect(Profile.getUserProfile(allProfiles, "4")).toEqual(null);
    });

    it("returns null when no profile or id is passed to query", () => {
        expect(Profile.getUserProfile(undefined, undefined)).toEqual(null);
        expect(Profile.getUserProfile(undefined, "1")).toEqual(null);
        expect(Profile.getUserProfile(allProfiles, undefined)).toEqual(null);
    });
});

describe("mergeProfilesWithSkills", () => {
    const Profile1 = new Profile({id: "1", profileSkills: ["a", "b"]});
    const Profile2 = new Profile({id: "2", profileSkills: ["c", "d", "z"]});

    const profileSkill1 = new ProfileSkill({id: "a", profileId: "1", skillId: "x", isHighlySkilled: true});
    const profileSkill2 = new ProfileSkill({id: "b", profileId: "1", skillId: "y", isHighlySkilled: false});
    const profileSkill3 = new ProfileSkill({id: "c", profileId: "2", skillId: "y", isHighlySkilled: false});
    const profileSkill4 = new ProfileSkill({id: "d", profileId: "2", skillId: "z", isHighlySkilled: true});

    const skillA = new Skill({id: "x", name: "test"});
    const skillB = new Skill({id: "y", name: "test2"});
    const skillC = new Skill({id: "z", name: "test3"});

    const combinedSkill1 = new Skill({id: "x", name: "test"});
    const combinedSkill2 = new Skill({id: "y", name: "test2"});
    const combinedSkill3 = new Skill({id: "z", name: "test3"});
    combinedSkill1.isHighlySkilled = true;
    combinedSkill2.isHighlySkilled = false;
    combinedSkill3.isHighlySkilled = true;

    const profiles = {[Profile1.id]: Profile1, [Profile2.id]: Profile2};
    const profileSkills = {[profileSkill1.id]: profileSkill1,
        [profileSkill2.id]: profileSkill2,
        [profileSkill3.id]: profileSkill3,
        [profileSkill4.id]: profileSkill4
    };
    const profileSkillsByProfileId = {[Profile1.id]: [profileSkill1.id, profileSkill2.id],
        [Profile2.id]: [profileSkill3.id, profileSkill4.id]
    };
    const skills = {[skillA.id]: skillA, [skillB.id]: skillB, [skillC.id]: skillC};

    const Profile1WithSkills = {...Profile1, skills: [combinedSkill1, combinedSkill2]};
    delete Profile1WithSkills.profileSkills;
    const Profile2WithSkills = {...Profile2, skills: [combinedSkill2, combinedSkill3]};
    delete Profile2WithSkills.profileSkills;

    const ProfilesWithSkills = [Profile1WithSkills, Profile2WithSkills];

    it("can merge a set of Profiles with a set of skills (while ignoring unknown skills)", () => {
        expect(Profile.mergeProfilesWithSkills(
            profiles, profileSkills, profileSkillsByProfileId, skills
        )).toEqual(ProfilesWithSkills);
    });

    it("returns an empty array when given empty inputs", () => {
        expect(Profile.mergeProfilesWithSkills()).toEqual([]);
    });
});

describe ("addSkills", () => {
    const skillA = new Skill({id: "x", name: "Test1"});
    const skillB = new Skill({id: "y", name: "Test2"});
    const skillC = new Skill({id: "z", name: "Test3"});

    const dbSkills = {[skillA.id]: skillA, [skillB.id]: skillB, [skillC.id]: skillC};

    const newSkill = "Test1";
    const updatedSkills1 = [];

    const newSkill2 = "teSt1";
    const updatedSkills2 = [];

    const newSkill3 = "Test4";
    const updatedSkills3 = [];

    const newSkill4 = "Test2";
    const updatedSkills4 = [skillB];

    it("skill already in database is sent", () => {
        expect(Profile.addSkill(newSkill, updatedSkills1, dbSkills)
        ).toEqual(skillA);
    });

    it("skill already in database is sent but with different case", () => {
        expect(Profile.addSkill(newSkill2, updatedSkills2, dbSkills)
        ).toEqual(skillA);
    });

    it("new skill is sent", () => {
        expect(Profile.addSkill(newSkill3, updatedSkills3, dbSkills).name
        ).toEqual(newSkill3);
    });

    it("skill already exists for user", () => {
        expect(typeof Profile.addSkill(newSkill4, updatedSkills4, dbSkills)
        ).toEqual("undefined");
    });

});