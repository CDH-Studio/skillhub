// Use some other random key for local development
const {
    PREDICTIONS_HOST = "predictions",
    PREDICTIONS_PORT = "5000",
    PREDICTIONS_PROTOCOL = "http",
    SCRAPER_API_KEY = "bf3d6ab4879949d5845eb50a31e9e3fa"
} = process.env;

let PREDICTIONS_URL = `${PREDICTIONS_PROTOCOL}://${PREDICTIONS_HOST}`;

if (PREDICTIONS_PORT !== "80" && PREDICTIONS_PORT !== "443") {
    PREDICTIONS_URL = `${PREDICTIONS_URL}:${PREDICTIONS_PORT}`;
}

module.exports = {
    PREDICTIONS_URL,
    SCRAPER_API_KEY
};
