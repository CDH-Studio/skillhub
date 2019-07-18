const axios = require("axios");
const {PREDICTIONS_API_KEY, PREDICTIONS_URL} = require("../config");

/* Interface to the 'predictions' service that handles predicting, among other things,
 * whether a set of issues qualifies a user as a contributor to a project. */
class PredictionsService {
    constructor({host = PREDICTIONS_URL} = {}) {
        this.baseUrl = host + "/api/v1";

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
}

module.exports = PredictionsService;
