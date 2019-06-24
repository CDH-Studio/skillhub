const {
    BACKEND_HOST = "backend",
    BACKEND_PORT = "5000",
    BACKEND_PROTOCOL = "http",
    JIRA_AUTH_TOKEN = null,
    JIRA_HOST = "https://skillhubca.atlassian.net",
    JIRA_PLATFORM = "cloud",
    SKILLHUB_API_KEY = "bf3d6ab4879949d5845eb50a31e9e3fa"
} = process.env;

let BACKEND_URL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}`;

if (BACKEND_PORT !== "80" && BACKEND_PORT !== "443") {
    BACKEND_URL = `${BACKEND_URL}:${BACKEND_PORT}`;
}

module.exports = {
    BACKEND_URL,
    JIRA_AUTH_TOKEN,
    JIRA_HOST,
    JIRA_PLATFORM,
    SKILLHUB_API_KEY
};
