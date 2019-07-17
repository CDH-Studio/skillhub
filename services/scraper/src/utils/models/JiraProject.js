class JiraProject {
    constructor({key = "", name = "", updated = new Date()}) {
        this.key = key;
        this.name = name;
        this.updated = updated;
    }

    toSkillhubProject() {
        return {
            name: this.name,
            description: this.key,
            jiraKey: this.key,
            lastActive: this.updated
        };
    }
}

module.exports = JiraProject;
