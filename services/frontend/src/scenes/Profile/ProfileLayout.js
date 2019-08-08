import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, IconButton, Paper} from "@material-ui/core";
import {Create} from "@material-ui/icons";
import {
    EditSkillsDialog, LoadingValidator, NavSidebar, ScrollContainer, SkillBadges
} from "components/";
import {Profile} from "utils/models";
import {PersonalDetails, Projects} from "./components";
import ScreenUrls from "utils/screenUrls";
import "./Profile.scss";
import classNames from "classnames";

const containerClass = ".scroll-container";

const sections = [
    {
        name: "Personal Details",
        selector: "profile-personal-details"
    },
    {
        name: "Skills",
        selector: "profile-skills"
    },
    {
        name: "Active Projects",
        selector: "profile-projects"
    }
];

const ProfileLayout = ({
    updateProfileSkills, addNewSkill, isUserProfile, databaseSkills, projects, profile, skills,
    isLoading
}) => (
    <ScrollContainer className="profile">
        <LoadingValidator
            dependencies={[profile]}
            isLoading={isLoading}
            renderOnLoad={
                <>
                    <NavSidebar
                        scrollSpySelectors={sections}
                        containerClass={containerClass}
                    />
                    <ProfileContent
                        databaseSkills={databaseSkills}
                        isUserProfile={isUserProfile}
                        projects={projects}
                        profile={profile}
                        skills={skills}
                        updateProfileSkills={updateProfileSkills}
                        addNewSkill={addNewSkill}
                    />
                </>
            }
            renderOnFailedLoad={
                <InvalidProfile />
            }
        />
    </ScrollContainer>
);

const InvalidProfile = () => (
    <Paper className="invalid-profile">
        <h2 className="invalid-profile-heading">
            Content Not Found
        </h2>
        <Link to={ScreenUrls.SEARCH}>
            <Button color="primary">
                Back to Search
            </Button>
        </Link>
    </Paper>
);

const ProfileContent = ({...sectionProps}) => (
    <div className="profile-content">
        {
            sections.map((section, index) => (
                <section id={section.selector} key={index}>
                    {renderSectionComponent(section.name, sectionProps)}
                </section>
            ))
        }
    </div>
);

const renderSectionComponent = (sectionName, sectionProps) => {
    switch (sectionName) {
        case "Personal Details":
            return <PersonalDetails {...sectionProps} />;
        case "Skills":
            return <Skills sectionName={sectionName} {...sectionProps} />;
        case "Active Projects":
            return <Projects sectionName={sectionName} {...sectionProps} />;
        default:
            return null;
    }
};

const Skills = ({addNewSkill, databaseSkills, isUserProfile, profile, sectionName, updateProfileSkills}) => {
    const [editSkillsDialogOpen, setEditSkillsDialogOpen] = useState(false);
    const [profileUpdated, updateProfile] = useState(profile);

    const openDialog = () => {
        setEditSkillsDialogOpen(true);
    };

    const closeDialog = () => {
        setEditSkillsDialogOpen(false);
    };

    const handleSubmit = (updatedSkills) => {
        const databaseSkillsName = Object.values(databaseSkills).map((skill) => skill.name.toLowerCase());
        const newSkills = updatedSkills.reduce((acc, skill) => {
            if (!databaseSkillsName.includes(skill.name.toLowerCase()))
                acc = [...acc, skill];
            return acc;
        }, []);
        profileUpdated.skillsToRemove = Profile.removeSkills(profileUpdated.skills, updatedSkills);
        profileUpdated.skills = updatedSkills;

        newSkills.map((skill) => addNewSkill(skill));
        updateProfileSkills(profileUpdated);
        updateProfile(profileUpdated);
        closeDialog();
    };

    const handleCancel = () => {
        closeDialog();
    };

    const skillsDisplay = profile.skills.length > 0 ?
        <SkillBadges
            displayCount={profileUpdated.skills.length}
            skills={profileUpdated.skills}
        />
        :
        <p> No skills found </p>;

    return (
        <>
            <EditSkillsDialog
                databaseSkills={databaseSkills}
                handleCancel={handleCancel}
                handleSubmit={(updatedSkills) => handleSubmit(updatedSkills)}
                open={editSkillsDialogOpen}
                skills={profileUpdated.skills}
            />
            <div className="profile-card-skills-header-section">
                <h2>{sectionName}</h2>

                <IconButton
                    className={classNames(
                        "profile-card-edit-skills-button",
                        {"profile-card-edit-skills-button--other": !isUserProfile}
                    )}
                    onClick={openDialog}
                    color="primary"
                >
                    <Create />
                </IconButton>
            </div>
            <Paper className="profile-page-card profile-card-skills">
                {skillsDisplay}
            </Paper>
        </>
    );
};

export default ProfileLayout;
