import logging
import pandas as pd
from data_models.processed_git_data import ProcessedGitData, RawStatsType
from typing import Dict, List


logger = logging.getLogger(__name__)


class SkillsPredictor:
    """
    Handles doing predictions from a map of (skill -> file -> stats) that are
    processed from the commit logs of a git repository.
    """

    def __init__(self):
        pass

    def predict(self, raw_stats: List[RawStatsType]) -> Dict[str, List[str]]:
        """
        Perform the skills predictions against a set of raw stats from a git repo.

        @param raw_stats: A map of raw stat data that looks like (skill -> file -> stats).
        @return: A dictionary containing the predictions for each person, i.e.:

        {
            [name]: ["SKILL_THAT_WAS_PREDICTED_TRUE"]
        }
        """
        if len(raw_stats) == 0:
            logger.warn("Received an empty set of raw stats; returning an empty result")
            return {}

        processed_data = ProcessedGitData(raw_stats)
        feature_vectors = processed_data.generate_feature_vectors()

        predictions = self._heuristic_model(feature_vectors)
        return predictions

    def _heuristic_model(self, feature_vectors: pd.DataFrame) -> Dict[str, List[str]]:
        return {}
