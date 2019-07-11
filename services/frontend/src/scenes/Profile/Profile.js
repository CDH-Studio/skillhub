import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({projects = [], profile = {}, skills = {}, isLoading = false}) => (
    <ProfileLayout
        projects={projects}
        profile={profile}
        skills={skills}
        isLoading={isLoading}
    />
);

export default connect(Profile);
