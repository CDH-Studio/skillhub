import logging
from flask import jsonify, request, Response
from utils import LoggingUtils
from utils.NestableBlueprint import NestableBlueprint


logger = logging.getLogger(__name__)

contributors_controller = NestableBlueprint("contributors", __name__, url_prefix="/contributors")


@contributors_controller.route("/predict", methods=["POST"])
@LoggingUtils.log_execution_time("Prediction processing finished")
def predict_contributors() -> Response:
    return jsonify({
        "status": "success"
    })
