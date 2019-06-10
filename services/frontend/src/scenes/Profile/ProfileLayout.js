import React from "react";
import {Avatar, Paper} from "@material-ui/core";
import {Email, LocalPhone} from "@material-ui/icons";
import {NavSidebar, ProjectCard, ScrollContainer} from "components/";
import {Project} from "utils/models";
import "./Profile.scss";
import { profilesRequestsSlice } from "store";

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

const ProfileLayout = ({projects}) => {
    return (
        <ScrollContainer>
            <NavSidebar
                scrollSpySelectors={sections}
                containerClass={containerClass}
            />

            <ProfileContent
                projects={projects}
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

const PersonalDetails = ({userProfile}) => (
    <Paper className="profile-card">
        <Avatar className="profile-card-picture">
            DS
        </Avatar>

        <div className="profile-card-content">
            <h2 className="profile-card-title">
                {userProfile}
            </h2>

            <h3 className="profile-card-subtitle">
                Software Developer
            </h3>

            <div className="profile-card-contact">
                <p className="profile-card-text">
                    <Email />
                    Devin.Sit@Canada.ca
                </p>

                <p className="profile-card-text">
                    <LocalPhone />
                    123-456-7890
                </p>
            </div>
        </div>
    </Paper>
);

const Skills = ({sectionName}) => (
    <>
        <h2>{sectionName}</h2>
        <Paper className="profile-card">
            Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
            sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
            rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
            eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
            cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
            i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

            Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
            sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
            rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
            eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
            cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
            i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

            <br /><br />

            Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
            sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
            rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
            eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
            cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
            i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.

            Occaecat reprehenderit fugiat qui ullamco ad commodo Lorem velit nisi aliquip sit esse officia con
            sequat. Officia aliqua ut reprehenderit ex occaecat ut aute dolor amet deserunt veniam. Reprehende
            rit Lorem laboris est consequat. Enim ipsum ea do esse non esse incididunt id deserunt elit except
            eur adipisicing ea irure. Elit voluptate cupidatat anim sit aute non excepteur Lorem nostrud occae
            cat irure ut esse fugiat. Veniam proident esse aliqua do mollit laboris dolor. Adipisicing est nis
            i id nisi nisi amet anim nostrud eiusmod ad fugiat qui.
        </Paper>
    </>
);

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
