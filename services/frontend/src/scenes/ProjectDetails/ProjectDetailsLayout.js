import React from "react";
import {ScrollContainer, NavSidebar, SkillBadges} from "components/";
import {Avatar, Paper, Tooltip} from "@material-ui/core";
import {Project} from "utils/models";
import "./ProjectDetails.scss";
import classNames from "classnames";

const containerClass = ".scroll-container";

const ProjectDetailsLayout = ({project, contributors}) => {
    return (
        <ScrollContainer className="project">
            <NavSidebar
                scrollSpySelectors={sections}
                containerClass={containerClass}
            />
            <ProjectContent project={project} contributors={contributors} />
        </ScrollContainer>
    );
};

const sections = [
    {
        name: "Project Info",
        selector: "project-info"
    },
    {
        name: "Contributors",
        selector: "project-contributors"
    },
    {
        name: "Used Skills",
        selector: "project-used-skills"
    },
    {
        name: "Changelog",
        selector: "project-changelog"
    }
];

const renderSectionComponent = (sectionName, sectionProps, contributors) => {
    switch (sectionName) {
        case "Project Info":
            return <ProjectInfo {...sectionProps} />;
        case "Contributors":
            return <Contributors sectionName={sectionName} {...sectionProps} {...contributors} />;
        case "Used Skills":
            return <UsedSkills sectionName={sectionName} {...sectionProps} />;
        case "Changelog":
            return <Changelog sectionName={sectionName} {...sectionProps} />;
        default:
    }
};

const ProjectContent = ({...sectionProps}) => (
    <div className="project-details-content">
        {
            sections.map((section, index) => (
                <section id={section.selector} key={index}>
                    {renderSectionComponent(section.name, sectionProps)}
                </section>
            ))
        }
    </div>
);

const ProjectInfo = ({project}) => {
    return (
        <Paper className="project-details-card">
            <div className="project-info-card-active-section">
                <ActiveBadge isActive={Project.isActive(project)} />
            </div>
            <div className="project-info-card-content-section">
                <h3 className="project-info-card-name">{project.name}</h3>
                <p className="project-info-card-description">{project.description}</p>
            </div>
        </Paper>
    );
};

const ActiveBadge = ({isActive = true}) => (
    <TextBadge
        className="active-badge"
        text={isActive ? "Active" : "Inactive"}
        isHighlighted={isActive}
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

const Contributors = ({sectionName, contributors}) => (
    <>
        <h2>{sectionName}</h2>
        <Paper className="project-details-card project-contributors-content">
            {contributors.map((contributor) => (
                <ContributorBadge
                    key={contributor.profile.name}
                    name={contributor.profile.name}
                    role={contributor.role}
                />
            ))}
        </Paper>
    </>
);

const UsedSkills = ({sectionName, project}) => (
    <>
        <h2>{sectionName}</h2>
        <Paper className="project-details-card project-used-skills-content">
            <SkillBadges
                skills={project.skills}
            />
        </Paper>
    </>
);

const Changelog = ({sectionName}) => (
    <>
        <h2>{sectionName}</h2>
        <Paper className="project-details-card">
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

            <br /> <br />

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

const ContributorBadge = ({name, role}) => {
    return (
        <div className="project-contributors-badge">
            <Tooltip title={role} placement={"top"}>
                <Avatar className="project-contributors-badge-picture">
                    {name[0]}
                </Avatar>
            </Tooltip>
            <h3 className="project-contributors-badge-name">{name}</h3>
        </div>
    );
};

export default ProjectDetailsLayout;