class JiraUser {
    constructor({displayName = "", emailAddress = ""}) {
        this.displayName = displayName;
        this.emailAddress = emailAddress;
    }

    toSkillhubUser() {
        return {
            name: reformatLastNameFirst(this.displayName),
            contactEmail: this.emailAddress
        };
    }
}

const reformatLastNameFirst = (name) => {
    if (name.includes(",")) {
        const splitName = name.split(",").map((n) => n.trim());
        return `${splitName[1]} ${splitName[0]}`;
    }

    return name;
};

module.exports = JiraUser;
