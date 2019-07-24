import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({
    addProfileSkills, addNewSkill, isLoading = false, isUserProfile, profile = {}, projects = [], skills = {}
}) => {
    return (
        <ProfileLayout
            isLoading={isLoading}
            isUserProfile={isUserProfile}
            profile={profile}
            projects={projects}
            databaseSkills={skills}
            addProfileSkills={addProfileSkills}
            addNewSkill={addNewSkill}
        />
    );
};

export default connect(Profile);
