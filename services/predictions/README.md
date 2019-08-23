# Predictions

## Running the Predictions Service

The `predictions` service handles taking in raw Jira data, processing it, and making various types of predictions using machine learning models.

Contributor predictions are made by looking at all of the issues for a given Jira project, and seeing if the ratio of various features (e.g. # of assigned tickets, # of comments made, etc) is high enough to roughly indicate that the user was a contributor to the project.

Obviously, the 'roughly' part comes into play since it is a machine learning model that is making the call.

Running the predictions service is just like any other service; it'll come up as part of `make start`.

### Predictions Service Authentication

In order to make any calls to the predictions service, you'll need the API key. When running locally, the value of the API key can be in `services/predictions/src/config.py`, under `SKILLHUB_API_KEY`.

To use the API key with curl, for example, you need to specify it as a header, like so:

```
curl -H "x-api-key: ${SKILLHUB_API_KEY}"
```

If you want to call the predictions service once it has been deployed to a branch environment or to production, please contact Devin to get access to the prod API key.

## Making a Contributor Prediction

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
