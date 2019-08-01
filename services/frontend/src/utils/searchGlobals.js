export class Query{
    constructor({
        searchTerm = "",
        searchBy = ""
    } = {}) {
        this.searchTerm = searchTerm;
        this.searchBy = searchBy;
    }
}

export const FILTER_PROJECTS = "Projects";
export const FILTER_PROFILES = "Profiles";
