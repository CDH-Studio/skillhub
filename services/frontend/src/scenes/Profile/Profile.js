import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

<<<<<<< HEAD
const Profile = ({projects = [], profile = {}, skills = {}, isLoading = false}) => (
=======
const Profile = ({projects = [], profile = {}, isLoading = false, onSubmit}) => (
>>>>>>> cc45810... CDHSH-89 Created rough functionality to update the database and store
    <ProfileLayout
        projects={projects}
        profile={profile}
        skills={skills}
        isLoading={isLoading}
        onSubmit={onSubmit}
    />
);

export default connect(Profile);
