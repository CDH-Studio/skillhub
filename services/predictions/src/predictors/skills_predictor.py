import logging
import pandas as pd
from typing import Dict, List, Tuple
from data_models.processed_git_data import ProcessedGitData, RawStatsType
from utils.email_matcher import EmailMatcher


logger = logging.getLogger(__name__)

SMALL_SKILLS = [
    "Ant Build System",
    "ApacheConf",
    "AutoHotkey",
    "Awk",
    "Batchfile",
    "CMake",
    "Dockerfile",
    "Git Attributes",
    "Git Config",
    "Makefile",
    "Maven POM",
    "Nginx",
    "Shell"
]


class SkillsPredictor:
    """
    Handles doing predictions from a map of (skill -> file -> stats) that are
    processed from the commit logs of a git repository.
    """

    def __init__(self):
        self.email_matcher = EmailMatcher()

    def predict(self, raw_stats: List[RawStatsType], existing_emails: List[str] = []) -> Dict[str, List[str]]:
        """
        Perform the skills predictions against a set of raw stats from a git repo.

        @param raw_stats: A map of raw stat data that looks like (skill -> file -> stats).
        @return: A dictionary containing the predictions for each person, i.e.:

        {
            [email]: ["SKILL_THAT_WAS_PREDICTED_TRUE"]
        }
        """
        if len(raw_stats) == 0:
            logger.warn("Received an empty set of raw stats; returning an empty result")
            return {}

        processed_data = ProcessedGitData(raw_stats)
        feature_vectors = processed_data.generate_feature_vectors()

        predictions = self._heuristic_model(feature_vectors)

        if existing_emails:
            git_emails = list(predictions.keys())
            matching_existing_emails = self.email_matcher.find_matching_emails(git_emails, existing_emails)

            remapped_predictions = {}  # type: Dict[str, List[str]]

            for email, skills in predictions.items():
                existing_email = matching_existing_emails[email]
                remapped_predictions.setdefault(existing_email, [])

                remapped_predictions[existing_email] = list(set(remapped_predictions[existing_email] + skills))

            return remapped_predictions
        else:
            return predictions

    def _heuristic_model(self, feature_vectors: pd.DataFrame) -> Dict[str, List[str]]:
        df = feature_vectors[feature_vectors["commit"] > 1]
        df = df[df["commit_date_difference"] > 1]

        small_skills_df, regular_skills_df = self._split_skills(df)

        small_skills_df = small_skills_df[small_skills_df["change_count"] > 2]
        regular_skills_df = regular_skills_df[regular_skills_df["change_count"] > 500]

        result = (
            small_skills_df
                .append(regular_skills_df)
                .groupby("email")
                .apply(lambda x: list(x["skill"]))
                .to_dict()
        )

        return result

    def _split_skills(self, df: pd.DataFrame) -> Tuple[pd.DataFrame, pd.DataFrame]:
        small_skill_filter = df["skill"].isin(SMALL_SKILLS)
        return (df[small_skill_filter], df[~small_skill_filter])
