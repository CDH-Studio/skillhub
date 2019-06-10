import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

// Split at each word, take the first and last words and then grab their first letters.
const generateAvatarInitials = (name) => {
    const initials = name.trim().split(" ");
    initials.splice(1, initials.length-2);

    return initials.reduce((acc, word) => (
        acc + word[0]
    ), []).toUpperCase();
};

const Profile = ({projects = [], userProfile = {}, profileLoadingState = false}) => {
    if (userProfile) {
        userProfile.avatarInitials = generateAvatarInitials(userProfile.name);
    }

    return (
        <ProfileLayout
            projects={projects}
            userProfile={userProfile}
            profileLoading={profileLoadingState}
        />
    );
};

export default connect(Profile);
