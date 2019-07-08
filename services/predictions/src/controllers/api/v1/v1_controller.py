from utils.NestableBlueprint import NestableBlueprint

v1_controller = NestableBlueprint("v1", __name__, url_prefix="/v1")
