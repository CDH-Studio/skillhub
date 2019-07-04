import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

<<<<<<< HEAD
const Profile = ({projects = [], profile = {}, skills = {}, isLoading = false, onSubmit}) => (
    <ProfileLayout
        projects={projects}
        profile={profile}
        skills={skills}
        isLoading={isLoading}
        onSubmit={onSubmit}
    />
);
=======
const Profile = ({
    projects = [], profile = {}, skills = {}, isLoading = false, onSubmit, isUserProfile, personalDetailsRequestData
}) => {
    personalDetailsRequestData.onSubmit = onSubmit;

    return (
        <ProfileLayout
            projects={projects}
            profile={profile}
            skills={skills}
            isLoading={isLoading}
            isUserProfile={isUserProfile}
            personalDetailsRequestData={personalDetailsRequestData}
        />
    );
};
>>>>>>> f98e76a... CDHSH-89 Fixed error popup and added styling

export default connect(Profile);
