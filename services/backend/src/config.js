const {
    PREDICTIONS_HOST = "predictions",
    PREDICTIONS_PORT = "5000",
    PREDICTIONS_PROTOCOL = "http",
    // Use some other random keys for local development
    PREDICTIONS_API_KEY = "5a2bd29d9f044bd294ea75af1d431365",
    SCRAPER_API_KEY = "bf3d6ab4879949d5845eb50a31e9e3fa"
} = process.env;

let PREDICTIONS_URL = `${PREDICTIONS_PROTOCOL}://${PREDICTIONS_HOST}`;

if (PREDICTIONS_PORT !== "80" && PREDICTIONS_PORT !== "443") {
    PREDICTIONS_URL = `${PREDICTIONS_URL}:${PREDICTIONS_PORT}`;
}

console.log(SCRAPER_API_KEY);
console.log(PREDICTIONS_API_KEY);

module.exports = {
    PREDICTIONS_URL,
    PREDICTIONS_API_KEY,
    SCRAPER_API_KEY
};
