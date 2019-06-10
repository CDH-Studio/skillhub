import React, {useMemo} from "react";
import classNames from "classnames";
import {Card, CardContent, IconButton} from "@material-ui/core";
import {ChevronRight} from "@material-ui/icons";
import "./ProjectCard.scss";

const DISPLAY_SKILL_COUNT = 3;

const ProjectCard = ({className, name, description, skills, isActive}) => {
    // Only show the first DISPLAY_SKILL_COUNT skills, so as to not crowd the card too much
    const skillBadges = useMemo(() => skills.slice(0, DISPLAY_SKILL_COUNT).map((name) => (
        <SkillBadge
            key={name}
            name={name}
        />
    )), [skills]);

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
                        {skillBadges}

                        {skills.length > DISPLAY_SKILL_COUNT && (
                            <div className="project-card-more-skills">
                                More skills...
                            </div>
                        )}
                    </div>
                </div>

                <div className="project-card-nav-section">
                    <IconButton>
                        <ChevronRight className="project-card-nav" />
                    </IconButton>
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

export default ProjectCard;
