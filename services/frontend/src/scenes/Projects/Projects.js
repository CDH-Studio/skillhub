import React, {useCallback, useMemo, useState} from "react";
import {Project} from "utils/models";
import ProjectsLayout from "./ProjectsLayout";

const lastMonth = (() => {
    const date = new Date();
    date.setDate(date.getDate() - 31);
    return date;
})();

const dummyData = [
    {
        id: "1",
        name: "Dank Meme Classifier",
        description: "A service for taking memes and dtermining if they are dank",
        skills: ["React", "Docker", "Kubernetes", "JavaScript"],
        lastActive: new Date()
    },
    {
        id: "2",
        name: "Skillhub",
        description: "A service for finding other people with skills",
        skills: ["JavaScript", "Feathers", "React", "Docker"],
        lastActive: lastMonth
    },
    {
        id: "3",
        name: "ScreenDoor",
        description: "A service for screening out people",
        skills: ["Python", "Django", "Docker", "AWS"],
        lastActive: new Date()
    }
];

const Projects = ({projects = dummyData}) => {
    const [activeFilter, setActiveFilter] = useState(Project.FILTER_ALL);
    const onFilterClick = useCallback((filter) => () => setActiveFilter(filter), [setActiveFilter]);

    const filteredProjects = useMemo(() => Project.filterProjects(projects, activeFilter), [projects, activeFilter]);

    return (
        <ProjectsLayout
            projects={filteredProjects}
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
        />
    );
};

export default Projects;
