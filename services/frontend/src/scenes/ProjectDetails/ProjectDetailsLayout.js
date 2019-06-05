import React from "react";
import {ScrollContainer, NavSidebar} from "components/";
import {Avatar, Paper} from "@material-ui/core";
import {Email, LocalPhone} from "@material-ui/icons";
import "./ProjectDetails.scss";

const containerClass = ".scroll-container";

const ProjectDetailsLayout = () => {
    return (
        <ScrollContainer>
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
    <div className="project-content">
        {
            sections.map((section, index) => (
                <section id={section.selector} key={index}>
                    {renderSectionComponent(section.name)}
                </section>
            ))
        }
    </div>
);

const ProjectInfo = () => (
    <Paper className="project-details-card">
        <Avatar className="project-details-card-picture">
            DS
        </Avatar>

        <div className="project-details-card-content">
            <h2 className="project-details-card-title">
                Devin Sit
            </h2>

            <h3 className="project-details-card-subtitle">
                Software Developer
            </h3>

            <div className="project-details-card-contact">
                <p className="project-details-card-text">
                    <Email />
                    Devin.Sit@Canada.ca
                </p>

                <p className="project-details-card-text">
                    <LocalPhone />
                    123-456-7890
                </p>
            </div>
        </div>
    </Paper>
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


export default ProjectDetailsLayout;