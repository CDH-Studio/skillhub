import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({projects = [], profile = {}, skills = {}, isLoading = false, onSubmit}) => (
    <ProfileLayout
        projects={projects}
        profile={profile}
        skills={skills}
        isLoading={isLoading}
        onSubmit={onSubmit}
    />
);

export default connect(Profile);
