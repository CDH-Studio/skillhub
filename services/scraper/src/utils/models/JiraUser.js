class JiraUser {
    constructor({displayName, emailAddress}) {
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
