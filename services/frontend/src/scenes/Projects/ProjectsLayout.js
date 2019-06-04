import React, {useMemo} from "react";
import classNames from "classnames";
import {Card, CardContent, IconButton} from "@material-ui/core";
import {ChevronRight} from "@material-ui/icons";
import "./Projects.scss";

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
            isActive={activeFilter === "all"}
            onClick={onFilterClick("all")}
        />

        <FilterButton
            label="Active"
            isActive={activeFilter === "active"}
            onClick={onFilterClick("active")}
        />

        <FilterButton
            label="Inactive"
            isActive={activeFilter === "inactive"}
            onClick={onFilterClick("inactive")}
        />
    </div>
);

const FilterButton = ({label, isActive = false, onClick}) => (
    <button
        className={classNames(
            "filter-button",
            {"filter-button--active": isActive}
        )}
        variant="contained"
        color="primary"
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
    const skillBadges = useMemo(() => skills.slice(0, 3).map((name) => (
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

                        {skills.length > 3 && (
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
