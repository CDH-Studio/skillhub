const lastMonth = (() => {
    const date = new Date();
    date.setDate(date.getDate() - 31);
    return date;
})();

const lastWeek = (() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
})();

const getId = (obj) => obj.id;

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

const PROFILE_IDS = PROFILES.map((profile) => profile.id);

const SKILLS = [
    {
        id: "6ce13d22-bd51-46ef-8026-9612350ac55a",
        name: "React",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "ba01fac6-e234-47d6-918f-6994aaf0f791",
        name: "Docker",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "83f35ea1-febf-4615-a68e-4e82d7600bee",
        name: "Kubernetes",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "43fbe123-1974-4588-a94f-b2967e4326a8",
        name: "Google Cloud Platform",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "da251d9c-4f4e-42a0-9d4e-0879f4a47147",
        name: "JavaScript",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "1be1c6e4-9b68-4a9f-a2d4-8b56c38d611c",
        name: "Feathers.js",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "6efac7d0-398b-4ecc-9609-c1357dfe0309",
        name: "AWS",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "5ad9c360-987b-4fb2-bde5-f098067dbaa7",
        name: "Python",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "cc2b59ec-7022-481c-8f57-55007df5e000",
        name: "Django",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const SKILL_IDS = SKILLS.map(getId);

const PROJECTS = [
    {
        id: "4b028cf2-2801-4294-9ab7-e471b28be51b",
        name: "Dank Meme Classifier",
        description: "A service for taking memes and determining if they are dank",
        lastActive: lastWeek,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7ff24db6-81c1-4e81-98fc-8fb34fb65102",
        name: "Skillhub",
        description: "A service for finding other people with skills",
        lastActive: lastMonth,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "68a6f3f4-bcc4-4249-ad57-3541c77f78af",
        name: "ScreenDoor",
        description: "A service for screening out people",
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const PROJECT_IDS = PROJECTS.map(getId);

const PROJECT_SKILLS = [
    {
        id: "4042339e-47d4-4b09-afb9-65d0fb7b905e",
        projectId: PROJECT_IDS[0],
        skillId: SKILL_IDS[0],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "49a6e762-e097-4333-a404-b06bd36cb495",
        projectId: PROJECT_IDS[0],
        skillId: SKILL_IDS[1],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "6fe93fe0-fdf3-46af-bad9-1b7985e466a4",
        projectId: PROJECT_IDS[0],
        skillId: SKILL_IDS[2],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "3f1fd112-2003-476f-adf6-cd0a17d1b2bf",
        projectId: PROJECT_IDS[0],
        skillId: SKILL_IDS[4],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "81a22025-78dd-4485-b270-71184cd05799",
        projectId: PROJECT_IDS[1],
        skillId: SKILL_IDS[4],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "b84f307c-aa10-417d-8b7f-9134f0a5ae36",
        projectId: PROJECT_IDS[1],
        skillId: SKILL_IDS[5],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "676a08a3-5c7d-45c0-84fe-297b6a840262",
        projectId: PROJECT_IDS[1],
        skillId: SKILL_IDS[0],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "86cc9cf5-de9f-4232-b2ad-e9c2f23de3dd",
        projectId: PROJECT_IDS[1],
        skillId: SKILL_IDS[1],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "5ac63694-08e2-4d47-bf80-c0fb243afe2d",
        projectId: PROJECT_IDS[2],
        skillId: SKILL_IDS[7],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "795152f6-a779-4c3f-9473-5ddd2c029617",
        projectId: PROJECT_IDS[2],
        skillId: SKILL_IDS[8],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "26ea5874-766f-4c29-af49-4aeb141a6ce4",
        projectId: PROJECT_IDS[2],
        skillId: SKILL_IDS[1],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "fbcbe2ee-b756-45c4-afe4-819ec830cf42",
        projectId: PROJECT_IDS[2],
        skillId: SKILL_IDS[6],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const PROJECT_SKILL_IDS = PROJECT_SKILLS.map(getId);

module.exports = {
    PROFILES,
    PROFILE_IDS,
    PROJECTS,
    PROJECT_IDS,
    PROJECT_SKILLS,
    PROJECT_SKILL_IDS,
    SKILLS,
    SKILL_IDS,
    USERS,
    USER_IDS
};
