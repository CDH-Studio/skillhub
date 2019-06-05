const USERS = [
    {
        id: "3e26fac0-7786-40f3-86bb-f175ff3d721d",
        email: "test@test.com",
        password: "$2a$13$ou.iRf4nlSfcXp0lRewliuxbp8wD9M8/CIy6pomcbL.EB5CrZMZze",  // Password = 'test'
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const PROFILES = [
    {
        id: "52e89288-f5f7-43aa-b4cd-0b9e7d6ee458",
        userId: "3e26fac0-7786-40f3-86bb-f175ff3d721d",
        name: "testBro",
        primaryRole: "Developer",
        contactEmail: "test@test.com",
        phone: "905-541-5810",
        slackHandle: "testguy",
        rocketChatHandle: "testman",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const USER_IDS = USERS.map((user) => user.id);
const PROFILE_IDS = PROFILES.map((profile) => profile.id);

module.exports = {
    USERS,
    USER_IDS,
    PROFILES,
    PROFILE_IDS
};
