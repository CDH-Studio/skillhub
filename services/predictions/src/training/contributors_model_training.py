import joblib
import json
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import requests
import scipy
import seaborn as sns
import sklearn
import sklearn.metrics
import warnings
from collections import Counter
from datetime import datetime
from imblearn.over_sampling import ADASYN
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from typing import Tuple

## File configuration

TRAINING_DATA_FOLDER = os.path.join(".", "training_data")
TRAINED_MODELS_FOLDER = os.path.join("..", "trained_models")

TRAINING_DATA_HASH = "all_data"

CURRENT_DATE = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
MODEL_TYPE = "extra_trees"
SCORING_ALGORITHM = "f1"
SAMPLING_ALGORITHM = "adasyn"
CROSS_VALIDATION_FOLDS = 5

TRAINING_DATA_FILE = os.path.join(FOLDER, "{}--training_data.csv")

TRAINED_MODEL_FILE = os.path.join(FOLDER, "{}-{}-{}-{}.joblib".format(
    CURRENT_DATE, MODEL_TYPE, SCORING_ALGORITHM, SAMPLING_ALGORITHM
))

## Parameter grids for doing Grid Search

params_grid_trees = {
    "bootstrap": [True],
    "class_weight": ["balanced"],
    "max_depth": [50, 80, 90, 100, 110, 120, 130, 140, 150, 200, 300, None],
    "max_features": ["auto"],
    "min_samples_leaf": [1, 2, 4],
    "min_samples_split": [3, 4, 5, 6, 7, 8, 9],
    "n_estimators": [30, 40, 50, 60, 70, 80, 100, 150, 200, 300],
}


## Helper Functions

def load_dataset(training_data_file: str) -> pd.DataFrame:
    # Load dataset
    raw_data_set = pd.read_csv(training_data_file)
    data_set = raw_data_set.drop(["projectKey", "name"], axis=1)

    # Make sure data set columns are in a consistent order
    data_set = data_set.reindex(sorted(data_set.columns), axis=1)
    
    return data_set


def split_dataset(data_set: pd.DataFrame) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    # "contributed" is the binary target label
    X_raw = data_set.drop("contributed", axis=1)
    y_raw = data_set["contributed"]

    # Resample the data so that there isn't a class imbalance between 0/1
    X, y = ADASYN().fit_resample(X_raw, y_raw)

    # - Use 0.4 (40%) of the data set for the test set
    # - Ensure consistent splitting by setting the random_state to 42 (the answer to everything)
    # - Stratify y so that there's an even split of classes in each data set
    #   -> (probably not necessary now that we use ADASYN, but ehh...)
    return train_test_split(X, y, test_size=0.4, random_state=42, stratify=y)


def find_best_model_grid_search(
    base_clf: sklearn.base.BaseEstimator,
    grid_params: Dict[str, List[Union[bool, int, str]]],
    cross_validation_folds: int = CROSS_VALIDATION_FOLDS,
    scoring_algorithm: str = SCORING_ALGORITHM
) -> sklearn.base.BaseEstimator:
    grid_search = GridSearchCV(
        base_clf,
        params,
        cv=cross_validation_folds,
        scoring=scoring_algorithm,
        n_jobs=-1,
        verbose=1
    )

    grid_search.fit(X_train, y_train)

    print(grid_search.best_params_)
    print(grid_search.best_score_)

    return grid_search.best_estimator_


## Train

def train(training_data_hash: str = TRAINING_DATA_HASH):
    # Load data set
    data_set = load_dataset(TRAINING_DATA_FILE.format(training_data_hash))

    # Split data set into train and test set
    X_train, X_test, y_train, y_test = split_dataset(data_set)

    # Perform grid search cross validation against the ExtraTreesClassifier to find optimal hyperparameters
    clf = find_best_model_grid_search(ExtraTreesClassifier(), params_grid_trees)

    # Score against the test set
    y_pred = clf.predict(X_test)
    print(getattr(sklearn.metrics, "{}_score".format(SCORING_ALGORITHM))(y_test, y_pred))

    # Save the best model to a file
    joblib.dump(clf, MODEL_FILE)


if __name__ == "__main__":
    train()
