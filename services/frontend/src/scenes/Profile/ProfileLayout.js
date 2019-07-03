import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {Button, IconButton, Paper} from "@material-ui/core";
import {Create} from "@material-ui/icons";
import {
    AvatarIcon, LoadingValidator, NavSidebar, PersonalDetailsDialog, ProfileCard, ProjectCard, ScrollContainer,
    SkillBadges
} from "components/";
import {Project} from "utils/models";
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

const ProfileLayout = ({projects, profile, isLoading}) => (
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
                        projects={projects}
                        profile={profile}
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
                handleClose={closeDialog}
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

const Skills = ({sectionName, profile}) => (
    <>
        <h2>{sectionName}</h2>
        <Paper className="profile-page-card profile-card-skills">
            <SkillBadges
                displayCount={profile.skills.length}
                skills={profile.skills}
            />
        </Paper>
    </>
);

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
