const feathers = require("@feathersjs/feathers");
const backend = require("app");
const hooks = require("./profiles.hooks");

describe("\"profiles\" service", () => {
    it("registered the service", () => {
        const service = backend.service("profiles");
        expect(service).toBeTruthy();
    });
});

describe("before create hook", () => {
    const Profile = backend.service("profiles").Model;

    const profile1 = Profile.build({name: "user1", contactEmail: "email@email1"}).toJSON();
    const profile2 = Profile.build({name: "user2", contactEmail: "email@email2"}).toJSON();
    const profile3 = Profile.build({name: "user3", contactEmail: "email@email3"}).toJSON();

    const inputProfiles = [profile1, profile2, profile3];
    const existingProfiles = [profile1, profile2];
    const newProfiles = [profile3];

    // Create a dummy Feathers app for mocking purposes
    const app = feathers();

    // Setup the profiles to return a fixed set of data when finding,
    // and to just pass back whatever makes it past the hook when creating
    app.use("/profiles", {
        async find() {
            return existingProfiles;
        },
        async create(data) {
            return data;
        }
    });

    // Setup the hook for testing against the test service
    app.service("profiles").hooks({
        before: {
            create: hooks.before.create
        }
    });

    it("prevents duplicates when doing bulk creates", async () => {
        const result = await app.service("profiles").create(inputProfiles);
        expect(result).toEqual(newProfiles);
    });

    it("returns an empty array when trying to create only profiles that already exist", async () => {
        const result = await app.service("profiles").create(existingProfiles);
        expect(result).toEqual([]);
    });

    it("ignores preventing duplicates when not doing bulk creates", async () => {
        const result = await app.service("profiles").create(existingProfiles[0]);
        expect(result).toEqual(existingProfiles[0]);
    });
});
