import React from "react";
import ProfileLayout from "./ProfileLayout";
import connect from "./connect";

const Profile = ({
    projects = [], profile = {}, skills = {}, isLoading = false,
    isUserProfile, personalDetailsRequest, submitPersonalDetails
}) => {
    personalDetailsRequest.submitPersonalDetails = submitPersonalDetails;
    return (
        <ProfileLayout
            projects={projects}
            profile={profile}
            skills={skills}
            isUserProfile={isUserProfile}
            personalDetailsRequest={personalDetailsRequest}
            isLoading={isLoading}
        />
    );
};

export default connect(Profile);