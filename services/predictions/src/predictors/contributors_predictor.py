import joblib
import logging
from config import CONTRIBUTORS_MODEL
from data_models.processed_jira_data import ProcessedJiraData, RawIssueType
from typing import Dict, List


logger = logging.getLogger(__name__)


class ContributorsPredictor:
    """
    Handles doing predictions from a set of issues for a Jira project to determine
    which people are actual contributors to the project.
    """

    def __init__(self):
        self.model = joblib.load(CONTRIBUTORS_MODEL)
        logger.info("Loaded contributors model {}".format(CONTRIBUTORS_MODEL))

    def predict(self, raw_issues: List[RawIssueType]) -> Dict[str, bool]:
        """
        Perform the contributor predictions against a set of raw issue data from Jira.

        @param raw_issues: A list of raw issue data from Jira
        @return: A dictionary containing the predictions of each person, per project, i.e.:

        {
            [projectKey]: {
                [contributorName]: {
                    "prediction": True/False
                }
            }
        }
        """
        if len(raw_issues) == 0:
            logger.warn("Received an empty list of issues; returning an empty result")
            return {}

        processed_data = ProcessedJiraData(raw_issues)
        feature_vectors = processed_data.generate_feature_vectors()

        predictions = self.model.predict(feature_vectors)

        # Add the predictions to the features so that we can use the same index -- that is,
        # so we can associate the predictions back to each (projectKey, name) combination.
        results = feature_vectors
        results["prediction"] = predictions.astype(bool)

        # Keep just the predictions, along with the index.
        results = results[["prediction"]]

        # Convert the multi-index DataFrame of (projectKey, name) to a dict of
        # {projectKey: {name: {prediction: bool}}}.
        # Code taken from https://stackoverflow.com/a/47920702.
        return {level: results.xs(level).to_dict("index") for level in results.index.levels[0]}
