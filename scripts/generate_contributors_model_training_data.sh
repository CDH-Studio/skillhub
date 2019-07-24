#!/bin/sh

set -e

# Get Jira auth token arg

if [[ $# -eq 0 ]]; then
    echo "Jira auth token missing; must be passed as first script argument."
    exit 1
fi

jira_auth_token=$1

# Scrape raw issues

cd ./services/scraper

echo "Installing scraper service dependencies..."
sudo rm -r node_modules
npm install

echo "Running scraper..."
JIRA_AUTH_TOKEN=$jira_auth_token npm run scrape:contributors

mv ./raw_issues.json ../predictions/src/training/training_data

# Process raw issues into training data set

cd ../predictions

echo "Installing prediction service dependencies..."
pipenv install

echo "Running training data generation..."
pipenv run python3 src/training/training_data/generate_contributors_model_training_data.py

rm src/training/training_data/raw_issues.json

# Go back to project root

cd ../../
echo "Done."
