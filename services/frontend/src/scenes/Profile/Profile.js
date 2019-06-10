import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

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

const dummyData = [
    {
        id: "1",
        name: "Dank Meme Classifier",
        description: "A service for taking memes and determining if they are dank.",
        skills: ["React", "Docker", "Kubernetes", "JavaScript"],
        lastActive: lastWeek
    },
    {
        id: "2",
        name: "Skillhub",
        description: "A service for finding other people with skills.",
        skills: ["JavaScript", "Feathers", "React", "Docker"],
        lastActive: lastMonth
    },
    {
        id: "3",
        name: "ScreenDoor",
        description: "A service for screening out people.",
        skills: ["Python", "Django", "Docker", "AWS"],
        lastActive: new Date()
    }
];

const addAvatarAcronym = (name) => (
    name.split(" ").reduce((acc, word) => {
        return acc = acc + word[0];
    }, []).toUpperCase()
);

const Profile = ({projects = dummyData, userProfile}) => {
    userProfile.nameAcronym = addAvatarAcronym(userProfile.name);
    
    return <ProfileLayout
        projects={projects}
        userProfile={userProfile}
    />
};

export default connect(Profile);
