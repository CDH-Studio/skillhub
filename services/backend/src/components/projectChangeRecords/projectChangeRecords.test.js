const app = require("app");

describe("\"projectChangeRecords\" service", () => {
    it("registered the service", () => {
        const service = app.service("projectChangeRecords");
        expect(service).toBeTruthy();
    });
});
