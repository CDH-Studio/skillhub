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

The Scraper is currently setup to pull data from the temporary [Jira instance](https://skillhubca.atlassian.net) that Devin setup.

In order to run the scraper locally, you'll need to have an account on the Jira instance and also have setup an API token (see [here](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) for a how-to).

Once you have your API token, you'll need to create a `.env` file in `services/scraper`, with the following format:

```
JIRA_AUTH_TOKEN=jira_username:api_token
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

## Running the Linter/Tests Locally

In order to maintain parity between the CI/CD pipeline and local development, all of the linting/testing is executed inside each services' Docker container.

To run the linter or tests locally, do the following:

1. Make sure the services are running (i.e. `make start`).
2. Run the corresponding Make command(s) depending on what you want linted/tested, e.g. `make lint-frontend-locally`.

# CI/CD Setup

The CI/CD pipeline is fully automated to handle linting, testing, and deployment of the web app. 

All commits (on every branch) are linted, tested, and deployed to a live namespace on a Kubernetes cluster that is hosted on GCP. Commits on `master` are available at the root `https://skillhub.ca` URL, whereas all other branches are available at separate `https://BRANCH_NAME.skillhub.ca` URLs.

CI/CD configuration is all setup by Kubails. For more information on the CI/CD configuration, visit the Kubails docs (TODO).

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
