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

const keyIdByName = (acc, obj) => {
    acc[obj.name] = obj.id;
    return acc;
};

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
const USER_IDS_BY_NAME = [...USERS].reduce(keyIdByName, {});

// In order to maintain seeder order integrity, this profile is created separately,
// because the seeder for it came first.
const TEST_PROFILE = [
    {
        id: "52e89288-f5f7-43aa-b4cd-0b9e7d6ee458",
        userId: USER_IDS[0],
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

const TEST_PROFILE_ID = TEST_PROFILE.map(getId);

const PROFILES = [
    {
        id: "7835a29d-b447-4812-b263-36ac30b9a053",
        userId: null,
        name: "Devin Sit",
        primaryRole: "Software Developer",
        contactEmail: "Devin.Sit@canada.ca",
        phone: "123-456-7890",
        slackHandle: "devin",
        rocketChatHandle: "devin",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7492d22b-5a2a-4b4f-bdea-277ec262082a",
        userId: null,
        name: "Bhalachandra Malghan",
        primaryRole: "Software Developer",
        contactEmail: "Bhalachandra.Malghan@canada.ca",
        phone: "123-456-7890",
        slackHandle: "bhala",
        rocketChatHandle: "bhala",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "6273733c-04d4-41c8-851d-e2b70356e67b",
        userId: null,
        name: "Joshua Gorman",
        primaryRole: "Software Developer",
        contactEmail: "Joshua.Gorman@canada.ca",
        phone: "123-456-7890",
        slackHandle: "josh",
        rocketChatHandle: "josh",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "f293a510-7477-4f48-857d-a59bcd16c9c4",
        userId: null,
        name: "Sam Heaton",
        primaryRole: "Software Developer",
        contactEmail: "Sam.Heaton@canada.ca",
        phone: "123-456-7890",
        slackHandle: "sam",
        rocketChatHandle: "sam",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2108b4e7-daf1-438f-9ad7-7612ef034bd4",
        userId: null,
        name: "Jared Ridyard",
        primaryRole: "Software Developer",
        contactEmail: "Jared.Ridyard@canada.ca",
        phone: "123-456-7890",
        slackHandle: "jared",
        rocketChatHandle: "jared",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "508f28a4-1dc2-4fb2-8273-1af56a72d673",
        userId: null,
        name: "Naman Sethi",
        primaryRole: "Software Developer",
        contactEmail: "Sethi.Naman@canada.ca",
        phone: "123-456-7890",
        slackHandle: "sethi",
        rocketChatHandle: "sethi",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const PROFILE_IDS = PROFILES.map((profile) => profile.id);
const PROFILE_IDS_BY_NAME = [...TEST_PROFILE, ...PROFILES].reduce(keyIdByName, {});

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
const SKILL_IDS_BY_NAME = SKILLS.reduce(keyIdByName, {});

const PROJECTS = [
    {
        id: "0951bb93-a04f-4f66-9e37-d10b6288b1f4",
        name: "Cloud Operations Services",
        description: "A service for operating on clouds",
        lastActive: lastWeek,
        createdAt: new Date(),
        updatedAt: new Date()
    },
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
const PROJECT_IDS_BY_NAME = PROJECTS.reduce(keyIdByName, {});

const PROJECT_PROFILES = [
    {
        id: "d653f7e8-8003-4a4a-9c9a-7fe88d62e51b",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        profileId: PROFILE_IDS_BY_NAME["Devin Sit"],
        role: "Software Developer",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "97eb4342-06ce-47c9-a983-a41f514b1a18",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        profileId: PROFILE_IDS_BY_NAME["Bhalachandra Malghan"],
        role: "Software Developer",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "0f467d15-a44d-4003-b150-5489731996a7",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        profileId: PROFILE_IDS_BY_NAME["Joshua Gorman"],
        role: "Software Developer",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "0f8c32b3-1da2-4215-bf13-f4f298017fd4",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        profileId: PROFILE_IDS_BY_NAME["testBro"],
        role: "The Test Bro",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "b56ca429-7e70-471e-80ad-b92e568254aa",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        profileId: PROFILE_IDS_BY_NAME["Sam Heaton"],
        role: "Software Developer",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "2d463ce4-cd8a-4cd1-9829-2634342061a5",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        profileId: PROFILE_IDS_BY_NAME["Jared Ridyard"],
        role: "Software Developer",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "e115172e-9d03-40dd-80d6-4a1d0e65629a",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        profileId: PROFILE_IDS_BY_NAME["Naman Sethi"],
        role: "Software Developer",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "24dcae33-9848-4ab8-87c6-43886638df4d",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        profileId: PROFILE_IDS_BY_NAME["testBro"],
        role: "The Test Bro",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "caa2c404-3040-4df7-ab41-8581ea5d75b1",
        projectId: PROJECT_IDS_BY_NAME["Dank Meme Classifier"],
        profileId: PROFILE_IDS_BY_NAME["Devin Sit"],
        role: "Creator of All",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "f36aa07b-e592-4648-9922-7ad8ae9ca829",
        projectId: PROJECT_IDS_BY_NAME["Dank Meme Classifier"],
        profileId: PROFILE_IDS_BY_NAME["testBro"],
        role: "The Test Bro",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const PROJECT_PROFILE_IDS = PROJECT_PROFILES.map(getId);

const PROJECT_SKILLS = [
    {
        id: "4042339e-47d4-4b09-afb9-65d0fb7b905e",
        projectId: PROJECT_IDS_BY_NAME["Dank Meme Classifier"],
        skillId: SKILL_IDS_BY_NAME["React"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "49a6e762-e097-4333-a404-b06bd36cb495",
        projectId: PROJECT_IDS_BY_NAME["Dank Meme Classifier"],
        skillId: SKILL_IDS_BY_NAME["Docker"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "6fe93fe0-fdf3-46af-bad9-1b7985e466a4",
        projectId: PROJECT_IDS_BY_NAME["Dank Meme Classifier"],
        skillId: SKILL_IDS_BY_NAME["Kubernetes"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "3f1fd112-2003-476f-adf6-cd0a17d1b2bf",
        projectId: PROJECT_IDS_BY_NAME["Dank Meme Classifier"],
        skillId: SKILL_IDS_BY_NAME["JavaScript"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "81a22025-78dd-4485-b270-71184cd05799",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        skillId: SKILL_IDS_BY_NAME["JavaScript"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "b84f307c-aa10-417d-8b7f-9134f0a5ae36",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        skillId: SKILL_IDS_BY_NAME["Feathers.js"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "676a08a3-5c7d-45c0-84fe-297b6a840262",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        skillId: SKILL_IDS_BY_NAME["React"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "86cc9cf5-de9f-4232-b2ad-e9c2f23de3dd",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        skillId: SKILL_IDS_BY_NAME["Docker"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "5ac63694-08e2-4d47-bf80-c0fb243afe2d",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        skillId: SKILL_IDS_BY_NAME["Python"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "795152f6-a779-4c3f-9473-5ddd2c029617",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        skillId: SKILL_IDS_BY_NAME["Django"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "26ea5874-766f-4c29-af49-4aeb141a6ce4",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        skillId: SKILL_IDS_BY_NAME["Docker"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "fbcbe2ee-b756-45c4-afe4-819ec830cf42",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        skillId: SKILL_IDS_BY_NAME["AWS"],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const PROJECT_SKILL_IDS = PROJECT_SKILLS.map(getId);

const PROFILE_SKILLS = [
    {
        id: "2e51e596-c938-434c-aabb-aac8096224b9",
        profileId: PROFILE_IDS_BY_NAME["Sam Heaton"],
        skillId: SKILL_IDS_BY_NAME["React"],
        isHighlySkilled: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "9549e841-5466-451c-ad3a-2c46013022f2",
        profileId: PROFILE_IDS_BY_NAME["Sam Heaton"],
        skillId: SKILL_IDS_BY_NAME["Docker"],
        isHighlySkilled: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "c80fd6f5-faa0-48b2-ac21-074727900e43",
        profileId: PROFILE_IDS_BY_NAME["Sam Heaton"],
        skillId: SKILL_IDS_BY_NAME["Kubernetes"],
        isHighlySkilled: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "c0103776-26a9-4dc2-84ac-1b7d9d89bac0",
        profileId: PROFILE_IDS_BY_NAME["Sam Heaton"],
        skillId: SKILL_IDS_BY_NAME["JavaScript"],
        isHighlySkilled: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "6cc69249-e29d-4660-9aa7-f8e2e27e2298",
        profileId: PROFILE_IDS_BY_NAME["testBro"],
        skillId: SKILL_IDS_BY_NAME["JavaScript"],
        isHighlySkilled: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "37ad7d7d-e5be-400b-8e36-9d178302b952",
        profileId: PROFILE_IDS_BY_NAME["testBro"],
        skillId: SKILL_IDS_BY_NAME["Feathers.js"],
        isHighlySkilled: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "a6758a2d-3f24-4116-8eb7-e06b5644766b",
        profileId: PROFILE_IDS_BY_NAME["testBro"],
        skillId: SKILL_IDS_BY_NAME["React"],
        isHighlySkilled: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "38daa54b-7c0b-40d6-abf9-c21aaff6b65e",
        profileId: PROFILE_IDS_BY_NAME["testBro"],
        skillId: SKILL_IDS_BY_NAME["Docker"],
        isHighlySkilled: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "af30de43-4fea-43e2-bb8d-90fd2b195f4a",
        profileId: PROFILE_IDS_BY_NAME["Joshua Gorman"],
        skillId: SKILL_IDS_BY_NAME["Python"],
        isHighlySkilled: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "6091e1cd-1956-409d-b68f-91bf09855d74",
        profileId: PROFILE_IDS_BY_NAME["Joshua Gorman"],
        skillId: SKILL_IDS_BY_NAME["Django"],
        isHighlySkilled: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "b3068dc2-af53-42af-814c-d7db69966d7a",
        profileId: PROFILE_IDS_BY_NAME["Joshua Gorman"],
        skillId: SKILL_IDS_BY_NAME["Docker"],
        isHighlySkilled: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "9bb4be3a-36ce-4794-85db-d4a9ccd6b8f0",
        profileId: PROFILE_IDS_BY_NAME["Joshua Gorman"],
        skillId: SKILL_IDS_BY_NAME["AWS"],
        isHighlySkilled: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const PROJECT_CHANGE_RECORDS = [
    {
        id: "7b0167c6-acae-11e9-a2a3-2a2ae2dbcce4",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        userId: USER_IDS_BY_NAME["Joshua Gorman"],
        changedAttribute: "description",
        oldValue: "X",
        newValue: "A service for finding other people with skills.",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7b016a1e-acae-11e9-a2a3-2a2ae2dbcce4",
        projectId: PROJECT_IDS_BY_NAME["Skillhub"],
        userId: USER_IDS_BY_NAME["Joshua gorman"],
        changedAttribute: "name",
        oldValue: "Y",
        newValue: "Skillhub",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7b016b7c-acae-11e9-a2a3-2a2ae2dbcce4",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        userId: USER_IDS_BY_NAME["testBro"],
        changedAttribute: "description",
        oldValue: "A service for classifying memes",
        newValue: "A service for screening people out",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7b016cbc-acae-11e9-a2a3-2a2ae2dbcce4",
        projectId: PROJECT_IDS_BY_NAME["ScreenDoor"],
        userId: USER_IDS_BY_NAME["testBro"],
        changedAttribute: "name",
        oldValue: "Meme Classifier",
        newValue: "ScreenDoor",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7b016df2-acae-11e9-a2a3-2a2ae2dbcce4",
        projectId: PROJECT_IDS_BY_NAME["Dank Meme Classifier"],
        userId: USER_IDS_BY_NAME["Sam Heaton"],
        changedAttribute: "name",
        oldValue: "Meme Classifier",
        newValue: "Dank Meme Classifier",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "7b0172b6-acae-11e9-a2a3-2a2ae2dbcce4",
        projectId: PROJECT_IDS_BY_NAME["Dank Meme Classifier"],
        userId: USER_IDS_BY_NAME["Sam Heaton"],
        changedAttribute: "description",
        oldValue: "A meme evaluation tool.",
        newValue: "A service for classifying memes.",
        createdAt: new Date(),
        updatedAt: new Date()
    },
];

const PROJECT_CHANGE_RECORD_IDS = PROJECT_CHANGE_RECORDS.map(getId);

const PROFILE_SKILL_IDS = PROFILE_SKILLS.map(getId);

module.exports = {
    PROFILES,
    PROFILE_IDS,
    PROFILE_SKILLS,
    PROFILE_SKILL_IDS,
    PROJECTS,
    PROJECT_IDS,
    PROJECT_CHANGE_RECORDS,
    PROJECT_CHANGE_RECORD_IDS,
    PROJECT_PROFILES,
    PROJECT_PROFILE_IDS,
    PROJECT_SKILLS,
    PROJECT_SKILL_IDS,
    SKILLS,
    SKILL_IDS,
    TEST_PROFILE,
    TEST_PROFILE_ID,
    USERS,
    USER_IDS
};
