const JiraScraper = require("./JiraScraper");
const {JiraUser} = require("utils/models");

describe("getUsers", () => {
    const user1 = new JiraUser({key: "test1", displayName: "test1", emailAddress: "test1@test.com"});
    const user2 = new JiraUser({key: "test2", displayName: "test2", emailAddress: "test2@test.com"});
    const userAddon = new JiraUser({key: "addon_test", displayName: "addon", emailAddress: "addon@addon.com"});

    const jiraUsers = [user1, user2, userAddon];
    const skillhubUsers = [user1.toSkillhubUser(), user2.toSkillhubUser()];

    const jiraScraper = new JiraScraper({authToken: "dummy"});

    it("can scrape non-addon users and convert them into a format usable for Skillhub", async () => {
        const axiosMock = jest.fn()
            .mockReturnValueOnce(Promise.resolve({data: jiraUsers}))
            .mockReturnValue(Promise.resolve({data: []}));

        jiraScraper.axios.get = axiosMock;

        const users = await jiraScraper.getUsers();

        expect(users).toEqual(skillhubUsers);
        expect(axiosMock.mock.calls.length).toBe(2);
    });

    it("can scrape more than the maximum number of users possible per call", async () => {
        const axiosMock = jest.fn()
            .mockReturnValueOnce(Promise.resolve({data: jiraUsers.slice(0, 2)}))
            .mockReturnValueOnce(Promise.resolve({data: jiraUsers.slice(2)}))
            .mockReturnValue(Promise.resolve({data: []}));

        jiraScraper.axios.get = axiosMock;

        const users = await jiraScraper.getUsers();

        expect(users).toEqual(skillhubUsers);
        expect(axiosMock.mock.calls.length).toBe(3);
    });

    it("can scrape no users", async () => {
        const axiosMock = jest.fn().mockReturnValue(Promise.resolve({data: []}));

        jiraScraper.axios.get = axiosMock;

        const users = await jiraScraper.getUsers();

        expect(users).toEqual([]);
        expect(axiosMock.mock.calls.length).toBe(1);
    });
});
