import logging
from flask import jsonify, request, Response
from werkzeug.exceptions import BadRequest, InternalServerError
# from middleware import api_key_authentication
from predictors.skills_predictor import SkillsPredictor
from utils import LoggingUtils
from utils.NestableBlueprint import NestableBlueprint


logger = logging.getLogger(__name__)

skills_controller = NestableBlueprint("skills", __name__, url_prefix="/skills")

predictor = SkillsPredictor()


@skills_controller.route("/predict", methods=["POST"])
# @api_key_authentication() TODO: Uncomment this
@LoggingUtils.log_execution_time("Prediction processing finished")
def predict_skills() -> Response:
    raw_stats = request.get_json()["raw_stats"]

    if type(raw_stats) != dict:
        raise BadRequest("'raw_stats' must be a set of skill/file stats from the Scraper service.")

    try:
        predictions = predictor.predict(raw_stats)
    except:
        raise InternalServerError("Failed to make predictions; see logs for more details.")

    return jsonify({
        "status": "success",
        "predictions": predictions
    })


@skills_controller.errorhandler(BadRequest)
def invalid_raw_stats(e: Exception):
    logger.error(str(e))

    response = jsonify({
        "message": str(e),
        "status": "error"
    })

    return response, 400
