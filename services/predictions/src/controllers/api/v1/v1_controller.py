from utils.NestableBlueprint import NestableBlueprint
from .contributors.contributors_controller import contributors_controller

v1_controller = NestableBlueprint("v1", __name__, url_prefix="/v1")
v1_controller.register_blueprint(contributors_controller)
