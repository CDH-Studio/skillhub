const EMAIL_REGEX = /^\S+@\S+$/;

export default class User {
    static validateUserInfo(email, password) {
        if (!email || !password) {
            throw new Error("Missing credentials");
        }

        if (!EMAIL_REGEX.test(email)) {
            throw new Error("Invalid email");
        }
    }
}
