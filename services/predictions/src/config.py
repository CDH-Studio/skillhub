import os

# Put app-wide configuration (like global variables) here.

MODELS_FOLDER = os.path.join(".", "src", "trained_models")
CONTRIBUTORS_MODEL = os.path.join(MODELS_FOLDER, "2019-07-15-14-17-41-our_jira_and_ccdev-extra_trees_f1_adasyn_random_5_weight_5.joblib")  # noqa

SKILLHUB_API_KEY = os.getenv("SKILLHUB_API_KEY", "5a2bd29d9f044bd294ea75af1d431365")
