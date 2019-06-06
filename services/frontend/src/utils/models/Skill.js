import uuidv4 from "uuid/v4";

export default class Skill {
    constructor({id = uuidv4(), name = "", createdAt = new Date(), updatedAt = new Date()}) {
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /* Normalizes the list of skills that the API returns into a map of {ID -> skill},
     * for appropriate use in the Redux store. */
    static normalizeApiResultsForRedux(skills = []) {
        return skills.reduce((acc, skill) => {
            acc[skill.id] = skill;
            return acc;
        }, {});
    }
}
