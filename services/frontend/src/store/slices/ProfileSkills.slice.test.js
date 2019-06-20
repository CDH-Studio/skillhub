import {initialState, profileSkillsSlice} from "./profileSkills.slice";
import {ProfileSkill} from "utils/models";

describe("reducer", () => {
    const {actions, reducer} = profileSkillsSlice;

    const profileSkill1 = new ProfileSkill({profileId: "1", skillId: "2"});
    const profileSkill2 = new ProfileSkill({profileId: "3", skillId: "4"});

    const profileSkills = [profileSkill1, profileSkill2];

    const stateWith1 = {
        byId: {[profileSkill1.id]: profileSkill1},
        byProfileId: {[profileSkill1.profileId]: [profileSkill1.id]},
        bySkillId: {[profileSkill1.skillId]: [profileSkill1.id]}
    };

    const stateWithAll = {
        byId: {
            [profileSkill1.id]: profileSkill1,
            [profileSkill2.id]: profileSkill2
        },
        byProfileId: {
            [profileSkill1.profileId]: [profileSkill1.id],
            [profileSkill2.profileId]: [profileSkill2.id]
        },
        bySkillId: {
            [profileSkill1.skillId]: [profileSkill1.id],
            [profileSkill2.skillId]: [profileSkill2.id],
        }
    };

    it("can add a single profile skill at a time", () => {
        expect(reducer(undefined, actions.addProfileSkill(profileSkill1))).toEqual(stateWith1);
        expect(reducer(stateWith1, actions.addProfileSkill(profileSkill2))).toEqual(stateWithAll);
    });

    it("can add multiple profile skills at once", () => {
        expect(reducer(undefined, actions.addProfileSkills(profileSkills))).toEqual(stateWithAll);
    });

    it("doesn't duplicate anything when adding an existing profile skills again", () => {
        expect(reducer(stateWith1, actions.addProfileSkill(profileSkill1))).toEqual(stateWith1);
    });

    it("doesn't duplicate anything when adding multiple existing profile skills again", () => {
        expect(reducer(stateWithAll, actions.addProfileSkills(profileSkills))).toEqual(stateWithAll);
    });
});
