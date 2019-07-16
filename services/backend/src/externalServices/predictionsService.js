const axios = require("axios");
const {PREDICTIONS_URL} = require("utils/config");

class PredictionsService {
    constructor({host = PREDICTIONS_URL} = {}) {
        this.baseUrl = host + "/api/v1";

        this.axios = axios.create({
            baseURL: this.baseUrl,
            maxContentLength: 100000000
        });
    }

    async predictContributors(issues = []) {
        return await this.axios.post("/contributors/predict", issues);
    }
}

module.exports = PredictionsService;
