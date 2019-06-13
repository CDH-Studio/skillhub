import Project from "./Project";
import Skill from "./Skill";

const lastMonth = (() => {
    const date = new Date();
    date.setDate(date.getDate() - 31);
    return date;
})();

const nextMonth = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 31);
    return date;
})();

const lastWeek = (() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
})();

describe("normalizeApiResultsForRedux", () => {
    const projectsList = [
        new Project({id: "1", skills: [{id: "a"}, {id: "b"}]}),
        new Project({id: "2", skills: [{id: "c"}, {id: "z"}]}),
        new Project({id: "3", skills: []}),
        new Project({id: "4", skills: null})
    ];

    const projectsMap = {
        [projectsList[0].id]: {...projectsList[0], skills: ["a", "b"]},
        [projectsList[1].id]: {...projectsList[1], skills: ["c", "z"]},
        [projectsList[2].id]: {...projectsList[2], skills: []},
        [projectsList[3].id]: {...projectsList[3], skills: []}
    };

    it("normalizes a list of projects to a map of projects with just skill IDs", () => {
        expect(Project.normalizeApiResultsForRedux(projectsList)).toEqual(projectsMap);
    });
});

describe("extractProjectProfiles", () => {
    const projects = [
        new Project({projectProfiles: [{id: "1"}, {id: "2"}]}),
        new Project({projectProfiles: [{id: "3"}]}),
        new Project({projectProfiles: []}),
        new Project()
    ];

    const projectProfiles = [{id: "1"}, {id: "2"}, {id: "3"}];

    it("extracts the lists of each project's projectProfiles into one list of projectProfiles", () => {
        expect(Project.extractProjectProfiles(projects)).toEqual(projectProfiles);
    });

    it("returns an empty array when given no input", () => {
        expect(Project.extractProjectProfiles()).toEqual([]);
        expect(Project.extractProjectProfiles([])).toEqual([]);
    });
});

describe("isActive", () => {
    it("returns true when the project was last active less than 30 days ago", () => {
        expect(Project.isActive(new Project({lastActive: new Date()}))).toBe(true);
        expect(Project.isActive(new Project({lastActive: lastWeek}))).toBe(true);
    });

    it("returns true when the project was somehow last active in the future", () => {
        expect(Project.isActive(new Project({lastActive: nextMonth}))).toBe(true);
    });

    it("returns false when the project was last active more than 30 days ago", () => {
        expect(Project.isActive(new Project({lastActive: lastMonth}))).toBe(false);
    });

    it("returns false when given nothing", () => {
        expect(Project.isActive()).toBe(false);
        expect(Project.isActive({})).toBe(false);
        expect(Project.isActive(null)).toBe(false);
        expect(Project.isActive(undefined)).toBe(false);
    });
});

describe("filterProjects", () => {
    const allProjects = [
        new Project({lastActive: lastMonth}),
        new Project({lastActive: lastWeek}),
        new Project({lastActive: new Date()})
    ];

    const activeProjects = [allProjects[2], allProjects[1]];
    const inactiveProjects = [allProjects[0]];

    it("returns all the projects when the filter is 'all'", () => {
        expect(Project.filterProjects(allProjects)).toEqual(allProjects);
        expect(Project.filterProjects(allProjects, Project.FILTER_ALL)).toEqual(allProjects);
    });

    it("returns all the projects when an invalid filter is provided", () => {
        expect(Project.filterProjects(allProjects, "lol wut")).toEqual(allProjects);
    });

    it("filters out inactive projects when the filter is 'active' and sorts by most recently active", () => {
        expect(Project.filterProjects(allProjects, Project.FILTER_ACTIVE)).toEqual(activeProjects);
    });

    it("filters out active projects when the filter is 'inactive'", () => {
        expect(Project.filterProjects(allProjects, Project.FILTER_INACTIVE)).toEqual(inactiveProjects);
    });
});

describe("mergeWithSkills", () => {
    const project1 = new Project({id: "1", skills: ["a", "b"]});
    const project2 = new Project({id: "2", skills: ["b", "c", "z"]});

    const skillA = new Skill({id: "a", name: "test"});
    const skillB = new Skill({id: "b", name: "test2"});
    const skillC = new Skill({id: "c", name: "test3"});

    const project1WithSkills = {...project1, skills: [{name: skillA.name}, {name: skillB.name}]};
    const project2WithSkills = {...project2, skills: [{name: skillB.name}, {name: skillC.name}]};

    const projects = {[project1.id]: project1, [project2.id]: project2};
    const skills = {[skillA.id]: skillA, [skillB.id]: skillB, [skillC.id]: skillC};

    const projectsWithSkills = [project1WithSkills, project2WithSkills];

    it("can merge a set of projects with a set of skills (while ignoring unknown skills)", () => {
        expect(Project.mergeWithSkills(projects, skills)).toEqual(projectsWithSkills);
    });

    it("returns an empty array when given empty inputs", () => {
        expect(Project.mergeWithSkills()).toEqual([]);
    });
});
