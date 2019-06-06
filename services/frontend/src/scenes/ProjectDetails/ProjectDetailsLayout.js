import React from "react";
import {ScrollContainer, NavSidebar} from "components/";
import {Card, CardContent, Paper} from "@material-ui/core";
import "./ProjectDetails.scss";

const containerClass = ".scroll-container";

const ProjectDetailsLayout = () => {
    return (
        <ScrollContainer className="project">
            <NavSidebar
                scrollSpySelectors={sections}
                containerClass={containerClass}
            />
            <ProjectContent />
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

const renderSectionComponent = (sectionName) => {
    switch (sectionName) {
        case "Project Info":
            return <ProjectInfo />;
        case "Contributors":
            return <Contributors sectionName={sectionName} />;
        case "Used Skills":
            return <UsedSkills sectionName={sectionName} />;
        case "Changelog":
            return <Changelog sectionName={sectionName} />;
        default:
    }
};

const ProjectContent = () => (
    <div className="project-details-content">
        {
            sections.map((section, index) => (
                <section id={section.selector} key={index}>
                    {renderSectionComponent(section.name)}
                </section>
            ))
        }
    </div>
);

const ProjectInfo = ({name, description}) => (
    <Card className="project-details-card">
        <CardContent className="project-info-card-content">
            <div className="project-info-card-active-section">
                <h3>Active</h3>
            </div>

            <div className="project-info-card-content-section">
                <h3 className="project-info-card-name">{name} Dank Meme Generator</h3>
                <p className="project-info-card-description">{description} abc</p>

            </div>
        </CardContent>
    </Card>
);

const Contributors = ({sectionName}) => (
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

const UsedSkills = ({sectionName}) => (
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

            <br /><br />

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