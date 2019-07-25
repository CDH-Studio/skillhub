import React from "react";
import classNames from "classnames";
import {Link} from "react-router-dom";
import {SkillBadges, TextBadge} from "components/";
import {Card, CardContent, IconButton} from "@material-ui/core";
import {Add, ChevronRight} from "@material-ui/icons";
import "./ProjectCard.scss";

const DISPLAY_SKILL_COUNT = 3;

const ProjectCard = ({
    className, id, name, description, showMoreSkills, skills, isActive, openRoleInputDialog, setCurrentProject
}) => {
    const openRoleInput = () => {
        openRoleInputDialog();
        setCurrentProject();
    };
    // Only show the first DISPLAY_SKILL_COUNT skills, so as to not crowd the card too much
    return (
        <Card className={classNames("project-card", className)}>
            <CardContent className="project-card-content">
                <div className="project-card-activity-section">
                    <ActiveBadge isActive={isActive} />
                </div>

                <div className="project-card-content-section">
                    <h3 className="project-card-name">{name}</h3>
                    <p className="project-card-description">{description}</p>

                    <div className="project-card-skills">
                        <SkillBadges
                            displayCount={DISPLAY_SKILL_COUNT}
                            skills={skills}
                        />
                    </div>

                    {showMoreSkills && skills.length > DISPLAY_SKILL_COUNT && (
                        <div className="project-card-more-skills">
                            More skills...
                        </div>
                    )}
                </div>
                <div className="project-card-nav-section">
                    {
                        className === "add-projects-dialog-card" ? (
                            <IconButton onClick={openRoleInput}>
                                <Add className="project-card-nav" />
                            </IconButton>
                        ) : (
                            <Link to={`/app/projects/${id}`}>
                                <IconButton>
                                    <ChevronRight className="project-card-nav" />
                                </IconButton>
                            </Link>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    );
};

const ActiveBadge = ({isActive = true}) => (
    <TextBadge
        className="active-badge"
        text={isActive ? "Active" : "Inactive"}
        isHighlighted={isActive}
    />
);

export default ProjectCard;
