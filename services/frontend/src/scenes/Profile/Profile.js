import React from "react";
import ProfileLayout from "./ProfileLayout";

const sections  = [
    {
        id: 0,
        className:"profile-personal-details",
        sectionName:"Personal Details"
    },
    {
        id: 1,
        className:"profile-skills",
        sectionName:"Skills"
    },
    {
        id: 2,
        className:"profile-projects",
        sectionName:"Projects"
    }
];
const containerClass = ".scroll-container";

const Profile = () => (
    <ProfileLayout
        sections={sections}
        containerClass={containerClass}
    />
);

export default Profile;
