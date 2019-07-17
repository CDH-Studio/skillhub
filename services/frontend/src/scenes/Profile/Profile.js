import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({
    isLoading = false, isUserProfile, profile = {}, projects = [], skills = {}
}) => {
    return (
        <ProfileLayout
            isLoading={isLoading}
            isUserProfile={isUserProfile}
            profile={profile}
            projects={projects}
            skills={skills}
        />
    );
};

export default connect(Profile);
