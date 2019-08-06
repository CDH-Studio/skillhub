import logging
import pandas as pd
from typing import Any, Dict
from utils import LoggingUtils


logger = logging.getLogger(__name__)

RawStatsType = Dict[str, Any]

MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000  # 24 hours, 60 minutes, 60 seconds, 1000 milliseconds

# A map of the columns from the API input to more standard python names.
COLUMN_MAP = {
    "author": "email",
    "oldestCommitDate": "oldest_commit_date",
    "latestCommitDate": "latest_commit_date",
    "changeCount": "change_count"
}

# A map to rename certain file types to actual skill names.
SKILL_RENAMES = {
    "Ant Build System": "Ant",
    "ApacheConf": "Apache",
    "Batchfile": "Batch",
    "Dockerfile": "Docker",
    "Git Attributes": "Git",
    "Git Config": "Git",
    "HCL": "Terraform",
    "Makefile": "Make"
}


class ProcessedGitData:
    """
    Handles taking in raw git repo stats and processing it into a
    more clean and usable format for prediction.
    """

    def __init__(self, raw_stats: RawStatsType) -> None:
        if len(raw_stats) != 0:
            self.process_data(raw_stats)
        else:
            logger.warn("Received an empty dict of raw stats; not processing anything")

    @LoggingUtils.log_execution_time("Git data processing finished")
    def process_data(self, raw_stats: RawStatsType) -> None:
        """Performs the processing to transform the raw git repo stats into our processed Git data format."""
        skills_df = (
            pd
                # Convert the stats straight into a DataFrame. This is the reason why the raw stats
                # are initially processed into a bunch of huge arrays -- so that this operation DataFrame
                # conversion is as fast as possible.
                .DataFrame(raw_stats)
                # Fill any missing values with 0.
                .fillna(0)
                # Rename the columns to make more sense and be more pythonic
                .rename(columns=COLUMN_MAP)
                # Group by email and skill so that we can aggregate on each skill for each person
                .groupby(["email", "skill"])
                # Aggregate the various columns using appropriate functions
                .agg({
                    "oldest_commit_date": min,
                    "latest_commit_date": max,
                    "change_count": sum,
                    "commit": lambda x: x.nunique(),
                    "file": lambda x: x.nunique()
                })
                .reset_index()
        )

        # Rename some 'skills' to actually look like skills (e.g. Dockerfile -> Docker)
        skills_df["skill"] = skills_df["skill"].replace(SKILL_RENAMES)

        # Convert milliseconds to days so that the data is easier to reason about
        skills_df["commit_date_difference"] = (
            (skills_df["latest_commit_date"] - skills_df["oldest_commit_date"]) / MILLISECONDS_IN_ONE_DAY
        )

        self.skills_df = skills_df

    @LoggingUtils.log_execution_time("Feature vector generation finished")
    def generate_feature_vectors(self) -> pd.DataFrame:
        """
        Convert the processed git data into a set of feature vectors that are useful for the prediction model.

        Kinda pointless right now since we're just using a heuristic model, but it's better that this match
        the interface of ProcessedJiraData than not.
        """
        return self.skills_df
