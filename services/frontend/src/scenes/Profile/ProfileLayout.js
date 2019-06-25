import React, {useMemo} from "react";
import {Avatar, CircularProgress, Paper} from "@material-ui/core";
import {Email, LocalPhone} from "@material-ui/icons";
import {AvatarIcon, NavSidebar, ProjectCard, ScrollContainer, SkillBadges} from "components/";
import {Project} from "utils/models";
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
        {
            (!profile || isLoading) ? (
                <CircularProgress className="loading-button-indicator" />
            ) : (
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
            )
        }
    </ScrollContainer>
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

const PersonalDetails = ({profile}) => (
    <Paper className="profile-card profile-card-personal-details">
        <AvatarIcon name={profile.name} className="avatar-icon" />
        <div className="profile-card-content">
            <h2 className="profile-card-title">
                {profile.name}
            </h2>

            <h3 className="profile-card-subtitle">
                {profile.primaryRole}
            </h3>

            <div className="profile-card-contact">
                <p className="profile-card-text">
                    <Email />
                    {profile.contactEmail}
                </p>

                <p className="profile-card-text">
                    <LocalPhone />
                    {profile.phone}
                </p>
            </div>
        </div>
    </Paper>
);

const Skills = ({sectionName, profile}) => (
    <>
        <h2>{sectionName}</h2>
        <Paper className="profile-card profile-card-skills">
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
            <div className="profile-card profile-card-projects">
                {projectCards}
            </div>
        </>
    );
};

export default ProfileLayout;
