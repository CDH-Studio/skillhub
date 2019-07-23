import hashlib
import json
import os
import pandas as pd
import random
import sys

# Add the root path of the project's folder so that deeply nested
# files and folders can access the top-level files and folders (like utils)
# without needing a ridiculous number of relative imports.
sys.path.append(os.path.abspath(os.path.join(__file__, "../../..")))  # noqa


from data_models.processed_jira_data import ProcessedJiraData


# File configuration

TRAINING_DATA_FOLDER = os.path.dirname(__file__)
RAW_ISSUES_FILE = os.path.join(TRAINING_DATA_FOLDER, "raw_issues.json")
TRAINING_DATA_FILE = os.path.join(TRAINING_DATA_FOLDER, "{}--training-data.csv")


# Heuristic Model

# The ratio at which we can say that someone 'contributed'
WEIGHT_CUTOFF = 0.05

# Somewhat arbitrary weight to assign to each column; somewhat derived from Jira analysis
vector_weight_map = {
    "time_spent": 10.0,
    "ticket_count": 1.3,
    "bug_ticket_count": 1.3,
    "done_ticket_count": 1.3,
    "high_priority_ticket_count": 1.0,
    "creator_ticket_count": 1.0,
    "changelog_count": 1.5,
    "status_change_changelog_count": 1.0,
    "comment_count": 1.3,
}


def calc_weight(ratio: float, base_weight: float) -> float:
    return ratio * base_weight


def heuristic_model(vector: pd.Series) -> bool:
    """
    Heuristic model for determining whether someone contributed to a project.

    Uses contribution ratios and weights to determine if a person did enough work
    to be classified as a contributor.

    Since this is used to generate the labels for the ML model training data, an element
    of randomness is injected into the classifications to regularize the data so that
    the model doesn't (heavily) overfit. This also helps to match the domain whereby someone
    might have been a contributor all along, but just didn't make great use of Jira (i.e. random sampling).
    """
    score = 0

    # Calculate the score by summing up all of the weighted contribution ratios
    for column in vector.index:
        if "ratio" not in column:
            ratio_column = column + "_ratio"
            score += calc_weight(vector[ratio_column], vector_weight_map[column])

    # Normalize score by number of types of columns
    # (i.e. divide by 2 so that the 'ratio' columns aren't counted)
    score /= len(vector.index) / 2

    # Multiply the score by a random factor to regularize the data
    score *= random.randint(8, 12) * 0.1

    # Randomly say that some people did or didn't contribute to regularize the data
    if score > WEIGHT_CUTOFF:
        # 1/20 (5%) chance to reject a contributor as a non-contributor
        return random.randint(1, 20) > 1
    else:
        # 1/20 (5%) chance to accept a non-contributor as a contributor
        return random.randint(1, 20) > 19


# Other Helper Functions

def hash_dataframe(df: pd.DataFrame) -> str:
    json_dump = json.dumps(df.reset_index().to_dict(), sort_keys=True, indent=2)
    return hashlib.md5(json_dump.encode("utf-8")).hexdigest()


# Main

def generate() -> None:
    with open(RAW_ISSUES_FILE, "r") as f:
        raw_issues = json.load(f)

    processed_data = ProcessedJiraData(raw_issues)
    feature_vectors = processed_data.generate_feature_vectors()
    feature_vectors["contributed"] = feature_vectors.apply(lambda x: int(heuristic_model(x)), axis=1)

    data_hash = hash_dataframe(feature_vectors)
    feature_vectors.to_csv(TRAINING_DATA_FILE.format(data_hash), index=False)


if __name__ == "__main__":
    generate()
