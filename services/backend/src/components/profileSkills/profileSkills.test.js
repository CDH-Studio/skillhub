const app = require("app");

describe("\"profileSkills\" service", () => {
    it("registered the service", () => {
        const service = app.service("profileSkills");
        expect(service).toBeTruthy();
    });
});
