import React, {useMemo} from "react";
import {Link} from "react-router-dom";
import {AvatarIcon, ScrollContainer, NavSidebar, SkillBadges, LoadingValidator} from "components/";
import {ProjectInfo} from "./components";
import {Button, Paper} from "@material-ui/core";
import {parseDateStringToYMD} from "utils/helperFunctions";
import ScreenUrls from "utils/screenUrls";
import "./ProjectDetails.scss";

const containerClass = ".scroll-container";

const ProjectDetailsLayout = ({isLoading, contributors, project, projectInfoRequest, projectChangeRecords, users}) => {
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
                            projectChangeRecords={projectChangeRecords}
                            projectInfoRequest={projectInfoRequest}
                            users={users}
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
        <Link to={ScreenUrls.SEARCH}>
            <Button color="primary">
                Back to Search
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

const UsedSkills = ({sectionName, project}) => {
    const skillsDisplay = project.skills.length > 0 ?
        <SkillBadges
            skills={project.skills}
        />
        :
        <p> There are no skills. </p>;
    return (
        <>
            <h2>{sectionName}</h2>
            <Paper className="project-details-card project-used-skills-content">
                {skillsDisplay}
            </Paper>
        </>
    );
};

const Changelog = ({projectChangeRecords, sectionName, users}) => {
    const mappedChangeRecords = useMemo(() => projectChangeRecords.map((projectChangeRecord) => {
        const changelogCreator = users[projectChangeRecord.userId];
        return (
            <ProjectChangeRecord
                changelogCreator={(changelogCreator) ? changelogCreator.email : null}
                className="project-changelog"
                key={projectChangeRecord.id}
                {...projectChangeRecord}
            />
        );
    }), [projectChangeRecords, users]);

    return (
        <>
            <h2>{sectionName}</h2>
            <Paper className="project-details-card project-changelog-content">
                {
                    (mappedChangeRecords.length === 0) ? (
                        <NoChangeRecords />
                    ) : (
                        mappedChangeRecords
                    )
                }
            </Paper>
        </>
    );
};

const NoChangeRecords = () => (
    <p>No project change records found</p>
);

const ProjectChangeRecord = ({className, oldValue, newValue, changedAttribute, createdAt, changelogCreator}) => {

    const changelogDescription = (changedAttribute === "Contributor") ? (
        `${changelogCreator} added contributor - "${newValue}"`
    ) : (
        `${changelogCreator} changed ${changedAttribute} - from "${oldValue}" to "${newValue}"`
    );

    return (
        <div className={className}>
            <p className="project-changelog-date">
                {parseDateStringToYMD(createdAt)}
            </p>
            <p className="project-changelog-description">
                {changelogDescription}
            </p>
        </div>
    );
};

export default ProjectDetailsLayout;