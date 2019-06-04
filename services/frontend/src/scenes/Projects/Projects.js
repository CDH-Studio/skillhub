import React, {useCallback, useState} from "react";
import ProjectsLayout from "./ProjectsLayout";

const dummyData = [
    {
        id: "1",
        name: "Dank Meme Classifier",
        description: "A service for taking memes and dtermining if they are dank",
        skills: ["React", "Docker", "Kubernetes", "JavaScript"]
    },
    {
        id: "2",
        name: "Skillhub",
        description: "A service for finding other people with skills",
        skills: ["JavaScript", "Feathers", "React", "Docker"]
    },
    {
        id: "3",
        name: "ScreenDoor",
        description: "A service for screening out people",
        skills: ["Python", "Django", "Docker", "AWS"]
    }
];

const Projects = ({projects = dummyData}) => {
    const [activeFilter, setActiveFilter] = useState("all");
    const onFilterClick = useCallback((filter) => () => setActiveFilter(filter), [setActiveFilter]);

    return (
        <ProjectsLayout
            projects={projects}
            activeFilter={activeFilter}
            onFilterClick={onFilterClick}
        />
    );
};

export default Projects;
