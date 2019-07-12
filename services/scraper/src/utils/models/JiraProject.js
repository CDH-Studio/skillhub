class JiraProject {
    constructor({key, name}) {
        this.key = key;
        this.name = name;
    }

    toSkillhubProject() {
        return {
            name: this.name,
            description: this.key,
            lastActive: new Date()
        };
    }
}

module.exports = JiraProject;
