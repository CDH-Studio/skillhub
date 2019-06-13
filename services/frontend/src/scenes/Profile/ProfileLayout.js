import React from "react";
import classNames from "classnames";
import {Avatar, CircularProgress, Paper} from "@material-ui/core";
import {Email, LocalPhone} from "@material-ui/icons";
import {NavSidebar, ProjectCard, ScrollContainer} from "components/";
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

const ProfileLayout = ({projects, profile, isLoading}) => {
    return (
        <ScrollContainer className="profile">
            <NavSidebar
                scrollSpySelectors={sections}
                containerClass={containerClass}
            />

            <ProfileContent
                projects={projects}
                profile={profile}
                isLoading={isLoading}
            />
        </ScrollContainer>
    );
};

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

const PersonalDetails = ({profile, isLoading}) => {
    //if there is no userprofile or the profile is currently loading
    if (!profile || isLoading) {
        return (
            <CircularProgress className="loading-button-indicator" />
        );
    }
    else {
        return (
            <Paper className="profile-card profile-card-personal-details">
                <Avatar className="profile-card-picture">
                    {profile.avatarInitials}
                </Avatar>

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
    }
};

const SkillBadge = ({name, isHighlySkilled = false}) => (
    <TextBadge
        className="skill-badge"
        text={name}
        isHighlighted={isHighlySkilled}
    />
);

const TextBadge = ({className, text, isHighlighted = false}) => (
    <div
        className={classNames(
            "text-badge",
            {"text-badge--highlighted": isHighlighted},
            className
        )}
    >
        {text}
    </div>
);

const Skills = ({sectionName, userProfile, profileLoading}) => {
    if (!userProfile || profileLoading) {
        return (
            <CircularProgress className="loading-button-indicator" />
        );
    }
    else {
        const skills = userProfile.skills;

        const skillBadges = skills.map((skill) => (
            <SkillBadge
                key={skill.name}
                name={skill.name}
                isHighlySkilled={skill.isHighlySkilled}
            />
        ));

        return (
            <>
                <h2>{sectionName}</h2>
                <Paper className="profile-card profile-card-skills">
                    {skillBadges}
                </Paper>
            </>
        );
    }
};

const Projects = ({sectionName, projects}) => (
    <>
        <h2>{sectionName}</h2>

        <div className="profile-card profile-card-projects">
            {
                projects.map((project) => (
                    <ProjectCard
                        className="profile-project-card"
                        key={project.id}
                        isActive={Project.isActive(project)}
                        {...project}
                    />
                ))
            }
        </div>
    </>
);

export default ProfileLayout;
