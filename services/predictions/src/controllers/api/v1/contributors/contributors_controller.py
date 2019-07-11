import logging
from flask import jsonify, request, Response
from werkzeug.exceptions import BadRequest, InternalServerError
from predictors.contributors_predictor import ContributorsPredictor
from utils import LoggingUtils
from utils.NestableBlueprint import NestableBlueprint


logger = logging.getLogger(__name__)

contributors_controller = NestableBlueprint("contributors", __name__, url_prefix="/contributors")

predictor = ContributorsPredictor()


@contributors_controller.route("/predict", methods=["POST"])
@LoggingUtils.log_execution_time("Prediction processing finished")
def predict_contributors() -> Response:
    issues = request.get_json()

    if type(issues) != list or len(issues) == 0:
        raise BadRequest("Invalid data; data should be a non-empty list of Jira issues.")

    try:
        predictions = predictor.predict(issues)
    except:
        raise InternalServerError("Failed to make predictions; is data a non-empty list of Jira issues?")

    return jsonify({
        "status": "success",
        "predictions": predictions
    })


@contributors_controller.errorhandler(BadRequest)
def invalid_issues(e: Exception):
    logger.error(str(e))

    response = jsonify({
        "message": str(e),
        "status": "error"
    })

    return response, 400
