import Skill from "./Skill";

describe("normalizeApiResultsForRedux", () => {
    const skillsList = [
        new Skill({id: "1"}),
        new Skill({id: "2"}),
        new Skill({id: "3"})
    ];

    const skillsMap = {
        [skillsList[0].id]: skillsList[0],
        [skillsList[1].id]: skillsList[1],
        [skillsList[2].id]: skillsList[2]
    };

    it("normalizes a list of skills to a map of skills indexed by ID", () => {
        expect(Skill.normalizeApiResultsForRedux(skillsList)).toEqual(skillsMap);
    });

    it("returns an empty object when given an empty input", () => {
        expect(Skill.normalizeApiResultsForRedux()).toEqual({});
        expect(Skill.normalizeApiResultsForRedux([])).toEqual({});
    });
});
