import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({
    addProfileSkills, addNewSkill, patchProfileSkills, isLoading = false, isUserProfile, profile = {}, projects = [],
    skills = {}
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
            patchProfileSkills={patchProfileSkills}
        />
    );
};

export default connect(Profile);
