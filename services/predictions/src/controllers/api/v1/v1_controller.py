from utils.NestableBlueprint import NestableBlueprint
from .contributors.contributors_controller import contributors_controller
from .skills.skills_controller import skills_controller

v1_controller = NestableBlueprint("v1", __name__, url_prefix="/v1")

v1_controller.register_blueprint(contributors_controller)
v1_controller.register_blueprint(skills_controller)
