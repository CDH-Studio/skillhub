import logging
import pandas as pd
from typing import Any, Dict
from utils import LoggingUtils


logger = logging.getLogger(__name__)

RawStatsType = Dict[str, Any]

MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000  # 24 hours, 60 minutes, 60 seconds, 1000 milliseconds

COLUMN_MAP = {
    "author": "email",
    "oldestCommitDate": "oldest_commit_date",
    "latestCommitDate": "latest_commit_date",
    "changeCount": "change_count"
}

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
    def __init__(self, raw_stats: RawStatsType) -> None:
        if len(raw_stats) != 0:
            self.process_data(raw_stats)
        else:
            logger.warn("Received an empty dict of raw stats; not processing anything")

    @LoggingUtils.log_execution_time("Git data processing finished")
    def process_data(self, raw_stats: RawStatsType) -> None:
        skills_df = (
            pd
                .DataFrame(raw_stats)
                .fillna(0)
                .reset_index(drop=True)
                .rename(columns=COLUMN_MAP)
                .groupby(["email", "skill"])
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

        # Convert milliseconds to days...
        skills_df["commit_date_difference"] = (
            (skills_df["latest_commit_date"] - skills_df["oldest_commit_date"]) / MILLISECONDS_IN_ONE_DAY
        )

        # ...and set a lower bound of 1 day's worth of time difference
        skills_df["commit_date_difference"] = skills_df["commit_date_difference"].clip(lower=1)

        self.skills_df = skills_df

    @LoggingUtils.log_execution_time("Feature vector generation finished")
    def generate_feature_vectors(self) -> pd.DataFrame:
        return self.skills_df
