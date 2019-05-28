const app = require("app");

describe("\"projectProfiles\" service", () => {
    it("registered the service", () => {
        const service = app.service("projectProfiles");
        expect(service).toBeTruthy();
    });
});
