const USERS = [
    {
        id: "3e26fac0-7786-40f3-86bb-f175ff3d721d",
        email: "test@test.com",
        password: "$2a$13$ou.iRf4nlSfcXp0lRewliuxbp8wD9M8/CIy6pomcbL.EB5CrZMZze",  // Password = 'test'
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const USER_IDS = USERS.map((user) => user.id);

module.exports = {
    USERS,
    USER_IDS
};
