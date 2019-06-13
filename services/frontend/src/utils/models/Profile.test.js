import Profile from "./Profile";

describe("normalizeApiResultsForRedux", () => {
    const ProfilesList = [
        new Profile({id: "1"})
    ];

    const ProfilesMap = {
        [ProfilesList[0].id]: {...ProfilesList[0]}
    };

    it("normalizes a list of Profiles to a map of Profiles with just skill IDs", () => {
        expect(Profile.normalizeApiResultsForRedux(ProfilesList)).toEqual(ProfilesMap);
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