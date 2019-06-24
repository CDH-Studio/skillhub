class JiraUser {
    constructor({key, displayName, emailAddress}) {
        this.key = key;
        this.displayName = displayName;
        this.emailAddress = emailAddress;
    }

    toSkillhubUser() {
        return {
            name: this.displayName,
            contactEmail: this.emailAddress
        };
    }
}

module.exports = JiraUser;
