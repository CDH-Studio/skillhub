# Skillhub

A platform for discovering skills.

# Contributors

- Devin Sit
- Joshua Gorman
- Bhalachandra Malghan

# Tech Stack

- Services Framework: [Kubails](https://github.com/DevinSit/kubails)
- Frontend Framework: React + Redux + Redux-Saga
- Backend Framework: Node + Express + Feathers
- Database: Postgres
- Testing Framework: Jest
- Hosting: Docker + Kubernetes

# Local Development

The following is a guide on how to bring up the pieces of the application for development.

## Web App Development Prerequisites

You must have the following already installed:

- docker
- docker-compose

## Running the Web App Services

To run the web app locally, run the following:

```
make start
```

You can then access the frontend at `localhost:3000`, and the backend at `localhost:5000`.

## Running the Scraper

The Scraper is currently setup to pull data from the CDH Studio accessible [Jira instance](https://jira.ised-isde.canada.ca).

In order to run the scraper locally, you'll need to have an account on the Jira instance.

Once you have your account, you'll need to create a `.env` file in `services/scraper`, with the following format:

```
JIRA_AUTH_TOKEN=jira_username:jira_password
```

Once the `.env` is created, running `make start` should bring up the scraper without any errors.

It runs on port `5001`.

**NOTE**: If there isn't a `.env` present for the scraper to pull Jira credentials from, it will throw an error when starting with `make start`. This is fine and can be ignored (assuming you don't need to test or develop the scraper).

### Using the Scraper

The Scraper has been setup so that it has one route that triggers all of its scraping activities: `/scraper`. You can hit this route locally with something like:

```
curl localhost:5001/scraper
```

To run the Scraper on a deployed branch or production, just change the host:

```
curl https://cdhsh-XX.scraper.skillhub.ca/scraper
```

This fully exposed, non-authenticated endpoint is merely to ease our development and testing processes.

In production, the scraper would most likely be running in-network, where it would have to be reconfigured to run the scraping process automatically when the container comes up.

In development, it makes more sense to have this be triggered manually for easier testing.

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

### Making a Contributor Prediction

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

## Running the Linter/Tests Locally

In order to maintain parity between the CI/CD pipeline and local development, all of the linting/testing is executed inside each services' Docker container.

To run the linter or tests locally, do the following:

1. Make sure the services are running (i.e. `make start`).
2. Run the corresponding Make command(s) depending on what you want linted/tested, e.g. `make lint-frontend-locally`.

# CI/CD Setup

The CI/CD pipeline is fully automated to handle linting, testing, and deployment of the web app.

All commits (on every branch) are linted, tested, and deployed to a live namespace on a Kubernetes cluster that is hosted on GCP. Commits on `master` are available at the root `https://skillhub.ca` URL, whereas all other branches are available at separate `https://BRANCH_NAME.skillhub.ca` URLs.

CI/CD configuration is all setup by Kubails. For more information on the CI/CD configuration, visit the Kubails docs (TODO).

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

# Code Structure

The bulk of the file structure of the repo is Kubails dependent, and as such has more to do with deployment. For more information on the default Kubails structure, visit the Kubails docs (TODO).

In terms of actual application code, all of it (for the web app) can be found in the `services/` folder. It is broken down as follows:

```
├── backend                                 # The backend Node/Feathers API
│   ├── config/                             # Feathers configuration files
│   ├── Dockerfile                          # Docker configuration
│   ├── Makefile                            # Makefile with commands that are used by Kubails
│   ├── package.json                        # Backend JavaScript dependencies
│   ├── scripts/                            # Other useful scripts for the backend
│   │
│   └── src/                                # Source files
│       ├── app.hooks.js                    # Top level app-scoped hooks
│       ├── app.js                          # Main app setup
│       ├── components/                     # The different domain services (e.g. 'transactions')
│       ├── db/                             # Database configuration and model schemas
│       ├── hooks/                          # Other feathers hooks
│       ├── index.js                        # Main entrypoint to the API
│       ├── middleware/                     # Node/Feathers middleware
│       └── utils/                          # Other utilities for the API
│
├── docker-compose.yaml                     # docker-compose config used by Kubails for local development
│
└── frontend                                # The frontend React app
    ├── Dockerfile                          # Docker configuration
    ├── jsconfig.json                       # create-react-app configuration to enable absolute imports
    ├── Makefile                            # Makefile with commands that are used by Kubails
    ├── package.json                        # Frontend JavaScript dependencies
    ├── public/                             # Public static assets
    ├── scripts/                            # Other useful scripts for the frontend
    ├── server/                             # The Node server that serves the frontend React app
    │
    └── src                                 # Source files
        ├── api/                            # Interface to the backend API (currently using the Feathers client)
        ├── App.js                          # Main app setup
        ├── App.scss                        # Main app styling (only very top-level)
        ├── AppRouter.js                    # Router for the authenticated app
        ├── assets/                         # All static assets (like icons, fonts, etc)
        ├── components/                     # Standalone React components (usually non-store connected, but they can be)
        ├── config.js                       # Frontend-wide configuration values
        ├── index.js                        # Main entrypoint to the frontend
        ├── index.scss                      # Where the css reset is activated
        ├── scenes/                         # Large, store-connected components that might have internal state (not necessarily equal to a 'page')
        ├── serviceWorker.js                # Service workers configuration
        │
        ├── store/                          # All Redux store related code
        │   ├── crossSliceSelectors.js      # Combines slice selectors to create cross-slice selectors
        │   ├── index.js                    # Re-exports everything from the store for convenience
        │   ├── mountpoints.js              # The strings to mount reducers at in the store
        │   ├── rootReducer.js              # Combines all the slice reducers into the one root reducer
        │   ├── sagas/                      # Sagas (for redux-saga) for handling side-effects and app-wide business logic
        │   ├── slices/                     # The store slices composed of actions, reducers, and selectors for each data domain
        │   ├── store.js                    # Setup code for the store
        │   └── utils/                      # Other utilities for the store
        │
        ├── styles/                         # Frontend-wide styles (colors, sass mixins, dimensional constants, etc)
        │
        └── utils/                          # Other utilities for the frontend
            ├── hooks/                      # Custom React hooks
            ├── models/                     # Models for the domain objects that contain data schema and related business logic
            └── screenUrls.js               # The string constants the define the URLs for each page
```
