# Predictions

# Running the Predictions Service

The `predictions` service handles taking in raw Jira data, processing it, and making various types of predictions using machine learning models.

Contributor predictions are made by looking at all of the issues for a given Jira project, and seeing if the ratio of various features (e.g. # of assigned tickets, # of comments made, etc) is high enough to roughly indicate that the user was a contributor to the project.

Obviously, the 'roughly' part comes into play since it is a machine learning model that is making the call.

Running the predictions service is just like any other service; it'll come up as part of `make start`.

## Predictions Service Authentication

In order to make any calls to the predictions service, you'll need the API key. When running locally, the value of the API key can be in `services/predictions/src/config.py`, under `SKILLHUB_API_KEY`.

To use the API key with curl, for example, you need to specify it as a header, like so:

```
curl -H "x-api-key: ${SKILLHUB_API_KEY}"
```

If you want to call the predictions service once it has been deployed to a branch environment or to production, please contact Devin to get access to the prod API key.

# Making a Contributor Prediction

In order to make a contributor prediction by hand, you first need to get a hold of some raw Jira issue data.

If you want to grab it manually from CDH Studio accessible Jira instance, you can do something like this:

```
curl -u "${YOUR JIRA USERNAME}:${YOUR JIRA PASSWORD}" https://jira.ised-isde.canada.ca/rest/api/2/search?jql=project=${A JIRA PROJECT KEY}&maxResults=1000&expand=changelog > data.json
```

where you subsitute in the correct information for your Jira username/password, as well as a Jira project key.

This'll only get you the first 1000 issues for the project, but that should be enough for just quick testing purposes.

Once you have your Jira data in a JSON file, you can then call the predictions service like so:

```
curl -X POST -H "x-api-key: ${SKILLHUB_API_KEY}" --data @data.json localhost:5002/api/v1/contributors/predict
```

# Model Training

If the models for the predictions ever need to be retrained, the following will show you how to do it.

## Contributors Model

Training the contributors model happens in two steps: picking/generating a dataset, and then training the model on that data set.

### Picking/Generating a Dataset

To find out which datasets already exist, look in the `services/predictions/src/training/training_data/` folder. If you want to use an existing dataset, make note of the 'hash' -- the part of the CSV file name before `--training-data.csv`.

If you instead want to generate a new dataset from the CDH Studio accessible [Jira instance](https://jira.ised-isde.canada.ca), you can run generation process with the following `make` command:

```
make generate-contributors-model-training-data JIRA_AUTH_TOKEN="YOUR_JIRA_USERNAME:YOUR_JIRA_PASSWORD"
```

This will add another CSV file to the `training_data` folder. Again, make note of its hash.

**NOTE 1:** One of the already existing datasets is the `our_jira_and_ccdev--training-data.csv` file. This dataset is special because it includes, as the name implies, all of the data from our [Jira instance](https://jira.ised-isde.canada.ca), as well as the data from the `CCDEV` project from the on-network [Jira instance](http://jira.ic.gc.ca).

This is the dataset that was used to train the current contributors model.

**NOTE 2:**: Since running `make generate-contributors-model-training-data` runs `scraper` and `predictions` service scripts on your host machine (_not_ in a Docker container), you'll need to make sure to have appropriate installations of Node/npm and Python 3/pipenv to install the packages and run the scripts.

### Training the Model

Once you have your dataset hash from the last section, training the model is just another `make` command:

```
make train-contributors-model DATASET_HASH="YOUR_DATASET_HASH"
```

On a 4 core i5-6200U laptop, this took about 4.5 minutes to train. It runs the grid search in parallel, so more cores = faster training.

Once it's done, it'll output the trained model to `services/predictions/src/trained_models/`.

To make use of the trained model in the `predictions` service, you'll need to manually update the `CONTRIBUTORS_MODEL` variable in the `services/predictions/src/config.py` file to use the new file name.
