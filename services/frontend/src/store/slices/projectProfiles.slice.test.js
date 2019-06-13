import {initialState, projectProfilesSlice} from "./projectProfiles.slice";
import {ProjectProfile} from "utils/models";

describe("reducer", () => {
    const {actions, reducer} = projectProfilesSlice;

    const projectProfile1 = new ProjectProfile({profileId: "1", projectId: "2"});
    const projectProfile2 = new ProjectProfile({profileId: "3", projectId: "4"});

    const projectProfiles = [projectProfile1, projectProfile2];

    const stateWith1 = {
        byId: {[projectProfile1.id]: projectProfile1},
        byProfileId: {[projectProfile1.profileId]: [projectProfile1.id]},
        byProjectId: {[projectProfile1.projectId]: [projectProfile1.id]}
    };

    const stateWithAll = {
        byId: {
            [projectProfile1.id]: projectProfile1,
            [projectProfile2.id]: projectProfile2
        },
        byProfileId: {
            [projectProfile1.profileId]: [projectProfile1.id],
            [projectProfile2.profileId]: [projectProfile2.id]
        },
        byProjectId: {
            [projectProfile1.projectId]: [projectProfile1.id],
            [projectProfile2.projectId]: [projectProfile2.id],
        }
    };

    it("can add a single project profile at a time", () => {
        expect(reducer(undefined, actions.addProjectProfile(projectProfile1))).toEqual(stateWith1);
        expect(reducer(stateWith1, actions.addProjectProfile(projectProfile2))).toEqual(stateWithAll);
    });

    it("can add multiple project profiles at once", () => {
        expect(reducer(undefined, actions.addProjectProfiles(projectProfiles))).toEqual(stateWithAll);
    });

    it("doesn't duplicate anything when adding an existing project profile again", () => {
        expect(reducer(stateWith1, actions.addProjectProfile(projectProfile1))).toEqual(stateWith1);
    });

    it("doesn't duplicate anything when adding multiple existing project profiles again", () => {
        expect(reducer(stateWithAll, actions.addProjectProfiles(projectProfiles))).toEqual(stateWithAll);
    });
});
