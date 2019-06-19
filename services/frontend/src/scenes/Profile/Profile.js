import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

//Split at each word, take the first and last words and then grab their first letters.
const generateAvatarInitials = (name) => {
    const initials = name.trim().split(" ");
    initials.splice(1, initials.length - 2);

    return initials.reduce((acc, word) => (
        acc + word[0]
    ), []).toUpperCase();
};

const Profile = ({projects = [], profile = {}, isLoading = false}) => {
    if (profile) {
        profile.avatarInitials = generateAvatarInitials(profile.name);
    }

    return (
        <ProfileLayout
            projects={projects}
            profile={profile}
            profileLoading={isLoading}
        />
    );
};

export default connect(Profile);
