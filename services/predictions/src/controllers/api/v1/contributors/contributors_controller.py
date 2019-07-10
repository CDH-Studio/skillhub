import logging
from flask import jsonify, request, Response
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
    predictions = predictor.predict(issues)

    return jsonify({
        "status": "success",
        "predictions": predictions
    })

@contributors_controller.route("/raw_predict", methods=["GET"])
@LoggingUtils.log_execution_time("Prediction processing finished")
def raw_predict_contributors() -> Response:
    predictions = predictor.raw_predict([
        [
            1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.1061016670772766e-05, 0.0,
            4.171359446043466e-05, 7.415097137772504e-05, 0.0, 0.0, 0.0, 0.0, 0.0
        ]
    ])

    return jsonify({
        "status": "success",
        "predictions": predictions
    })
