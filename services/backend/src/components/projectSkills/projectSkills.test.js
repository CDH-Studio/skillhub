const app = require("app");

describe("\"projectSkills\" service", () => {
    it("registered the service", () => {
        const service = app.service("projectSkills");
        expect(service).toBeTruthy();
    });
});
