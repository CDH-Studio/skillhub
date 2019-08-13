import React from "react";
import connect from "./connect";
import OnboardingLayout from "./OnboardingLayout";

const Onboarding = ({user, error, isLoading, onSubmit}) => {
    return (
        <OnboardingLayout
            user={user}
            error={error}
            isLoading={isLoading}
            onSubmit={onSubmit}
        />
    );
};

export default connect(Onboarding);
