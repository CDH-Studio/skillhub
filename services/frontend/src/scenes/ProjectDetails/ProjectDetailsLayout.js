import React, {useMemo} from "react";
import {Link} from "react-router-dom";
import {AvatarIcon, ScrollContainer, NavSidebar, SkillBadges, LoadingValidator} from "components/";
import {ProjectInfo} from "./components";
import {Button, Paper} from "@material-ui/core";
import {parseDateStringToYMD} from "utils/helperFunctions";
import ScreenUrls from "utils/screenUrls";
import "./ProjectDetails.scss";

const containerClass = ".scroll-container";

const ProjectDetailsLayout = ({isLoading, contributors, project, projectInfoRequest, projectChangeRecords}) => {
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

const Changelog = ({projectChangeRecords, sectionName}) => {
    const mappedChangeRecords = useMemo(() => projectChangeRecords.map((projectChangeRecord) => (
        <ProjectChangeRecord
            className="project-changelog"
            key={projectChangeRecord.id}
            {...projectChangeRecord}
        />
    )), [projectChangeRecords]);

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

const ProjectChangeRecord = ({className, oldValue, newValue, changedAttribute, createdAt}) => (
    <div className={className}>
        <p className="project-changelog-date">
            {parseDateStringToYMD(createdAt)}
        </p>
        <p className="project-changelog-description">
            {changedAttribute} changed - from &quot;{oldValue}&quot; to &quot;{newValue}&quot;
        </p>
    </div>
);

export default ProjectDetailsLayout;