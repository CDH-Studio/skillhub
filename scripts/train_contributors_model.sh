#!/bin/sh

set -e

# Get dataset hash arg

if [[ $# -eq 0 ]]; then
    echo "Dataset hash is missing; must be passed as first script argument."
    exit 1
fi

dataset_hash=$1

# Train model

cd ./services/predictions

echo "Installing predictions service dependencies..."
pipenv install

echo "Training model using dataset ${dataset_hash}..."
pipenv run python3 src/training/train_contributors_model.py --training-data-hash $dataset_hash

# Go back to project root

cd ../../
echo "Done."
