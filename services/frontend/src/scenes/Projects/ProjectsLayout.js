import React, {useMemo} from "react";
import classNames from "classnames";
import {Card, CardContent, IconButton} from "@material-ui/core";
import {ChevronRight} from "@material-ui/icons";
import {Project} from "utils/models";
import "./Projects.scss";

const DISPLAY_SKILL_COUNT = 3;

const ProjectsLayout = ({projects, activeFilter, onFilterClick}) => (
    <div className="projects">
        <ProjectsHeader
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
        />

        <ProjectsList
            projects={projects}
        />
    </div>
);

const ProjectsHeader = ({activeFilter, onFilterClick}) => (
    <div className="projects-header">
        <FilterButton
            label="All"
            isActive={activeFilter === Project.FILTER_ALL}
            onClick={onFilterClick(Project.FILTER_ALL)}
        />

        <FilterButton
            label="Active"
            isActive={activeFilter === Project.FILTER_ACTIVE}
            onClick={onFilterClick(Project.FILTER_ACTIVE)}
        />

        <FilterButton
            label="Inactive"
            isActive={activeFilter === Project.FILTER_INACTIVE}
            onClick={onFilterClick(Project.FILTER_INACTIVE)}
        />
    </div>
);

const FilterButton = ({label, isActive = false, onClick}) => (
    <button
        className={classNames(
            "filter-button",
            {"filter-button--active": isActive}
        )}
        onClick={onClick}
    >
        {label}
    </button>
);

const ProjectsList = ({projects}) => {
    const projectCards = useMemo(() => projects.map((props) => (
        <ProjectCard
            key={props.id}
            {...props}
        />
    )), [projects]);

    return (
        <div className="projects-list">
            {projectCards}
        </div>
    );
};

const ProjectCard = ({name, description, skills}) => {
    // Only show the first DISPLAY_SKILL_COUNT skills, so as to not crowd the card
    const skillBadges = useMemo(() => skills.slice(0, DISPLAY_SKILL_COUNT).map((name) => (
        <SkillBadge
            key={name}
            name={name}
        />
    )), [skills]);

    return (
        <Card className="project-card">
            <CardContent className="project-card-content">
                <div className="project-card-active-section">
                    <ActiveBadge />
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

export default ProjectsLayout;
