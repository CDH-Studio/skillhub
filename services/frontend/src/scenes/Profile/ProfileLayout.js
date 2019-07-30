import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, IconButton, Paper} from "@material-ui/core";
import {Create} from "@material-ui/icons";
import {
    EditSkillsDialog, LoadingValidator, NavSidebar, ScrollContainer, SkillBadges
} from "components/";
import {PersonalDetails, Projects} from "./components";
import {Profile} from "utils/models";
import ScreenUrls from "utils/screenUrls";
import "./Profile.scss";

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
        name: "Projects",
        selector: "profile-projects"
    }
];

const ProfileLayout = ({
    addProfileSkills, addNewSkill, isUserProfile, databaseSkills, projects, profile, skills, isLoading
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
                        addProfileSkills={addProfileSkills}
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
        <Link to={ScreenUrls.PEOPLE}>
            <Button color="primary">
                Back to People
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
        case "Projects":
            return <Projects sectionName={sectionName} {...sectionProps} />;
        default:
            return null;
    }
};

const Skills = ({addProfileSkills, addNewSkill, sectionName, profile, databaseSkills}) => {
    const [editSkillsDialogOpen, setEditSkillsDialogOpen] = useState(false);
    const [profileUpdated, updateProfile] = useState(profile);

    const openDialog = () => {
        setEditSkillsDialogOpen(true);
    };

    const closeDialog = () => {
        setEditSkillsDialogOpen(false);
    };

    const handleSubmit = (updatedSkills) => {
        updateProfile(Profile.removeSkills(profileUpdated, updatedSkills));
        updateProfile(Profile.addSkills(profileUpdated, updatedSkills, databaseSkills));
        //profileUpdated.newSkillObjects.map((skill) => addNewSkill(skill));
        //delete profileUpdated.newSkillObjects;
        //addProfileSkills(profileUpdated);
        closeDialog();
    };

    const handleCancel = () => {
        closeDialog();
    };

    return (
        <>
            <EditSkillsDialog
                databaseSkills={databaseSkills}
                skills={profileUpdated.skills}
                open={editSkillsDialogOpen}
                handleCancel={handleCancel}
                handleSubmit={(updatedSkills) => handleSubmit(updatedSkills)}
            />
            <div className="profile-card-skills-header-section">
                <h2>{sectionName}</h2>
                <IconButton className="profile-card-edit-skills-button" onClick={openDialog} color="primary">
                    <Create />
                </IconButton>
            </div>
            <Paper className="profile-page-card profile-card-skills">
                <SkillBadges
                    displayCount={profileUpdated.skills.length}
                    skills={profileUpdated.skills}
                />
            </Paper>
        </>
    );
};

export default ProfileLayout;
