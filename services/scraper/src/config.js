const {
    BACKEND_HOST = "backend",
    BACKEND_PORT = "5000",
    BACKEND_PROTOCOL = "http",
    GIT_AUTH_TOKEN = null,
    GIT_HOST = "https://api.github.com",
    GIT_PLATFORM = "github",
    JIRA_AUTH_TOKEN = null,
    JIRA_HOST = "https://jira.ised-isde.canada.ca",
    JIRA_PLATFORM = "server",
    SKILLHUB_API_KEY = "bf3d6ab4879949d5845eb50a31e9e3fa"
} = process.env;

let BACKEND_URL = `${BACKEND_PROTOCOL}://${BACKEND_HOST}`;

if (BACKEND_PORT !== "80" && BACKEND_PORT !== "443") {
    BACKEND_URL = `${BACKEND_URL}:${BACKEND_PORT}`;
}

const REDIS_CONFIG = {
    redis: {
        port: 6379,
        host: "redis"
    }
};

module.exports = {
    BACKEND_URL,
    GIT_AUTH_TOKEN,
    GIT_HOST,
    GIT_PLATFORM,
    JIRA_AUTH_TOKEN,
    JIRA_HOST,
    JIRA_PLATFORM,
    REDIS_CONFIG,
    SKILLHUB_API_KEY
};
