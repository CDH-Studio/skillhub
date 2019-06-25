import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({projects = [], profile = {}, isLoading = false}) => {

    return (
        <ProfileLayout
            projects={projects}
            profile={profile}
            profileLoading={isLoading}
        />
    );
};

export default connect(Profile);
