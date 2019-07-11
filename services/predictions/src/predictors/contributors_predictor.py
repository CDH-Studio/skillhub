import joblib
from config import CONTRIBUTORS_MODEL
from data_models.processed_jira_data import ProcessedJiraData, RawIssueType
from typing import Dict, List


class ContributorsPredictor:
    def __init__(self):
        self.model = joblib.load(CONTRIBUTORS_MODEL)

    def predict(self, raw_issues: List[RawIssueType]) -> Dict[str, bool]:
        processed_data = ProcessedJiraData(raw_issues)
        feature_vectors = processed_data.generate_feature_vectors()

        predictions = self.model.predict(feature_vectors)

        # Add the predictions to the features so that we can use the same index -- that is,
        # so we can associate the predictions back to each (projectKey, name) combination.
        results = feature_vectors
        results["prediction"] = predictions.astype(bool)

        # Keep just the predictions, along with the index.
        results = results[["prediction"]]

        # Convert the multi-index DataFrame of (projectKey, name)
        # to a dict of {projectKey: {name: {prediction: bool}}}.
        # Code taken from https://stackoverflow.com/a/47920702.
        return {level: results.xs(level).to_dict("index") for level in results.index.levels[0]}
