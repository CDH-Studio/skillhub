export class Query{
    constructor({
        searchTerm = "",
        searchBy = ""
    } = {}) {
        this.searchTerm = searchTerm;
        this.searchBy = searchBy;
    }
}

export const searchRecords = (records, searchTerm, searchType) => {
    if (searchType === "name") {
        const searchTermLC = searchTerm.toLowerCase();
        return records.filter((record) => {
            const recordNameLC = record.name.toLowerCase();
            return recordNameLC.includes(searchTermLC);
        });
    } else if (searchType === "skill") {
        const searchTermLC = searchTerm.toLowerCase();
        return records.filter((record) => {
            return record.skills.reduce((acc, skill) => {
                const skillNameLC = skill.name.toLowerCase();
                return acc || skillNameLC.includes(searchTermLC);
            }, false);
        });
    } else {
        return records;
    }
};

export const FILTER_PROJECTS = "Projects";
export const FILTER_PROFILES = "Profiles";
export const SEARCH_OPTIONS = [
    "name",
    "skill"
];