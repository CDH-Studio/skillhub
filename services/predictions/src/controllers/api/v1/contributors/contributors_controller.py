import logging
from flask import jsonify, request, Response
from werkzeug.exceptions import BadRequest, InternalServerError
from middleware import api_key_authentication
from predictors.contributors_predictor import ContributorsPredictor
from utils import LoggingUtils
from utils.NestableBlueprint import NestableBlueprint


logger = logging.getLogger(__name__)

contributors_controller = NestableBlueprint("contributors", __name__, url_prefix="/contributors")

predictor = ContributorsPredictor()


@contributors_controller.route("/predict", methods=["POST"])
@api_key_authentication()
@LoggingUtils.log_execution_time("Prediction processing finished")
def predict_contributors() -> Response:
    issues = request.get_json()

    if type(issues) != list:
        raise BadRequest("'issues' must be a list of Jira issues.")

    try:
        predictions = predictor.predict(issues)
    except:
        raise InternalServerError("Failed to make predictions; see logs for more details.")

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
