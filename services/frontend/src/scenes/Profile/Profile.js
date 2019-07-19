import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({addNewProfileSkill, addNewSkill, isLoading = false, isUserProfile, profile = {}, projects = [], skills = {}}

) => {
    return (
        <ProfileLayout
            isLoading={isLoading}
            isUserProfile={isUserProfile}
            profile={profile}
            projects={projects}
            databaseSkills={skills}
            addNewProfileSkill={addNewProfileSkill}
            addNewSkill={addNewSkill}
        />
    );
};

export default connect(Profile);
