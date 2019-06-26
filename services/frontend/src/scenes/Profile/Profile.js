import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({projects = [], profile = {}, isLoading = false}) => (
    <ProfileLayout
        projects={projects}
        profile={profile}
        isLoading={isLoading}
    />
);

export default connect(Profile);
