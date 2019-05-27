const app = require("app");

describe("\"skills\" service", () => {
    it("registered the service", () => {
        const service = app.service("skills");
        expect(service).toBeTruthy();
    });
});
