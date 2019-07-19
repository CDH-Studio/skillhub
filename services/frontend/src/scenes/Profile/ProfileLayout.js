import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {Button, IconButton, Paper} from "@material-ui/core";
import {Create} from "@material-ui/icons";
import PersonalDetails from "./components";
import {
    EditSkillsDialog, LoadingValidator, NavSidebar, ProjectCard,
    ScrollContainer, SkillBadges
} from "components/";
import {Profile, Project} from "utils/models";
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

const ProfileLayout = ({addNewProfileSkill, addNewSkill, isUserProfile, databaseSkills, projects, profile, skills, isLoading}) => (
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
                        addNewProfileSkill={addNewProfileSkill}
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

const PersonalDetails = ({profile}) => {
    const [personalDetailsDialogOpen, setPersonalDetailsDialogOpen] = useState(false);

    const openDialog = () => {
        setPersonalDetailsDialogOpen(true);
    };

    const closeDialog = () => {
        setPersonalDetailsDialogOpen(false);
    };

    return (
        <>
            <PersonalDetailsDialog
                profile={profile}
                open={personalDetailsDialogOpen}
                closeDialog={closeDialog}
            />
            <Paper className="profile-page-card profile-card-details">
                <div className="profile-card-details-content">
                    <ProfileCard
                        key={profile.name}
                        page="profile"
                        {...profile}
                    />
                    <IconButton className="profile-card-details-edit-button" onClick={openDialog} color="primary">
                        <Create />
                    </IconButton>
                </div>
            </Paper>
        </>
    );
};

const PersonalDetailsDialog = ({closeDialog, open, profile}) => {
    const formFieldData = {
        "nameInput": {
            ...useInput(profile.name),
            id: "name",
            label: "Name",
            autoFocus: true
        },
        "emailInput": {
            ...useInput(profile.contactEmail),
            id: "contactEmail",
            label: "Contact Email"
        },
        "roleInput": {
            ...useInput(profile.primaryRole),
            id: "role",
            label: "Primary Role"
        },
        "phoneInput": {
            ...useInput(profile.phone),
            id: "phone",
            label: "Phone Number"
        },
        "slackInput": {
            ...useInput(profile.slackHandle),
            id: "slackHandle",
            label: "Slack Handle"
        },
        "rocketChatInput": {
            ...useInput(profile.rocketChatHandle),
            id: "rocketChatHandle",
            label: "Rocket Chat Handle"
        }
    };

    return (
        <DetailsDialog
            dialogTitle="Edit Personal Details"
            open={open}
            closeDialog={closeDialog}
            formFieldData={formFieldData}
        />
    );
};

const Skills = ({addNewProfileSkill, addNewSkill, sectionName, profile, databaseSkills}) => {
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
        updateProfile(Profile.addSkills(profileUpdated, updatedSkills, skills));
        console.log(profile.newSkillObjects);
        profileUpdated.newSkillObjects.map((skill) => addNewSkill(skill));
        console.log(profile.newProfileSkillsObjects);
        profileUpdated.newProfileSkillsObjects.map((profileSkill) => addNewProfileSkill(profileSkill))
        closeDialog();
    };

    const handleCancel = () => {
        closeDialog();
    };

    return (
        <>
            <EditSkillsDialog
                databaseSkills={databaseSkills}
                skills={profileUpdated.skills.map((skill) => skill.name)}
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
const Projects = ({sectionName, projects}) => {
    const projectCards = useMemo(() => projects.map((project) => (
        <ProjectCard
            className="profile-project-card"
            key={project.id}
            isActive={Project.isActive(project)}
            {...project}
        />
    )), [projects]);

    return (
        <>
            <h2>{sectionName}</h2>
            <div className="profile-page-card profile-card-projects">
                {projectCards}
            </div>
        </>
    );
};

export default ProfileLayout;
