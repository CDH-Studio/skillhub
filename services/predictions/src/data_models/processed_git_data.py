import logging
import pandas as pd
from typing import Any, Dict
from utils import LoggingUtils


logger = logging.getLogger(__name__)

RawStatsType = Dict[str, Any]


class ProcessedGitData:
    def __init__(self, raw_stats: RawStatsType) -> None:
        if len(raw_stats) != 0:
            self.process_data(raw_stats)
        else:
            logger.warn("Received an empty dict of raw stats; not processing anything")

    @LoggingUtils.log_execution_time("Git data processing finished")
    def process_data(self, raw_stats: RawStatsType) -> None:
        self.skills_df = pd.DataFrame()

    @LoggingUtils.log_execution_time("Feature vector generation finished")
    def generate_feature_vectors(self) -> pd.DataFrame:
        return self.skills_df
