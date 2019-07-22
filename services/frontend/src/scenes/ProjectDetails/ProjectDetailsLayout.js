import React from "react";
import {Link} from "react-router-dom";
import {AvatarIcon, ScrollContainer, NavSidebar, SkillBadges, LoadingValidator} from "components/";
import {ProjectInfo} from "./components";
import {Button, Paper} from "@material-ui/core";
import "./ProjectDetails.scss";
import ScreenUrls from "utils/screenUrls";

const containerClass = ".scroll-container";

const ProjectDetailsLayout = ({isLoading, contributors, project, projectInfoRequest}) => {
    return (
        <ScrollContainer className="project">
            <LoadingValidator
                dependencies={[project]}
                isLoading={isLoading}
                renderOnLoad={
                    <>
                        <NavSidebar
                            scrollSpySelectors={sections}
                            containerClass={containerClass}
                        />
                        <ProjectContent
                            contributors={contributors}
                            project={project}
                            projectInfoRequest={projectInfoRequest}
                        />
                    </>
                }
                renderOnFailedLoad={
                    <InvalidProject />
                }
            />
        </ScrollContainer>
    );
};

const InvalidProject = () => (
    <Paper className="invalid-project">
        <h2 className="invalid-project-heading">
            Content Not Found
        </h2>
        <Link to={ScreenUrls.PEOPLE}>
            <Button color="primary">
                Back to People
            </Button>
        </Link>
    </Paper>
);

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

const renderSectionComponent = (sectionName, sectionProps) => {
    switch (sectionName) {
        case "Project Info":
            return <ProjectInfo {...sectionProps} />;
        case "Contributors":
            return <Contributors sectionName={sectionName} {...sectionProps} />;
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

const Contributors = ({sectionName, contributors}) => {
    return (
        <>
            <h2>{sectionName}</h2>
            <Paper className="project-details-card project-contributors-content">
                {contributors.map((contributor) => {
                    return (
                        <div className="project-contributors-badge" key={contributor.name}>
                            <Link to={ScreenUrls.PEOPLE + `/${contributor.profileId}`}>
                                <AvatarIcon
                                    name={contributor.name}
                                    personsRole={contributor.role}
                                    className="avatar-icon"
                                />
                                <h3 className="project-contributors-badge-name">{contributor.name}</h3>
                            </Link>
                        </div>
                    );
                }
                )}
            </Paper>
        </>
    );
};

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

export default ProjectDetailsLayout;