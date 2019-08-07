const axios = require("axios");
const {logger: baseLogger} = require("utils/");
const {PREDICTIONS_API_KEY, PREDICTIONS_URL} = require("../config");

const logger = baseLogger.child({module: "PredictionsService"});

/* Interface to the 'predictions' service that handles predicting, among other things,
 * whether a set of issues qualifies a user as a contributor to a project. */
class PredictionsService {
    constructor({host = PREDICTIONS_URL} = {}) {
        this.baseUrl = host + "/api/v1";

        logger.info({message: "Predictions service base url", url: this.baseUrl});

        this.axios = axios.create({
            baseURL: this.baseUrl,
            headers: {"x-api-key": PREDICTIONS_API_KEY},
            maxContentLength: 100000000
        });
    }

    async predictContributors(issues = []) {
        const response = await this.axios.post("/contributors/predict", issues);
        return response.data.predictions;
    }

    async predictSkills(rawStats = {}, existingEmails = []) {
        const response = await this.axios.post(
            "/skills/predict", {raw_stats: rawStats, existing_emails: existingEmails}
        );

        return response.data.predictions;
    }
}

module.exports = PredictionsService;
