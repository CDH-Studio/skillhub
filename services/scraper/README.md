# Scraper

The Scraper service is arguably what makes Skillhub.. Skillhub. It handles scraping all of the raw data from Jira and Bitbucket to be able then feed into the Backend for predictions and persistence.

It is an Express-based API that calls out to the Jira/Bitbucket APIs and scrapes them for they're worth it.

The Scraper service also makes use of a series of worker instances (backed by a Redis-based job queue) to concurrently perform the scraping in a more robust fashion.

# Tech Stack

- Language: JavaScript/Node
- API Framework: Express
- Job Queue: Redis + Bull

# Code Structure

```
├── Dockerfile                                      # Docker configuration
├── Makefile                                        # Makefile with commands for Kubails
├── package.json                                    # JavaScript dependencies
├── scripts/                                        # Other useful scripts for the Scraper
│   ├── run.sh                                      # Startup script for the main Scraper process
│   ├── run_worker.sh                               # Startup script for the worker Scraper processes
│   └── skill_file_breakdown.rb                     # Crucial ruby script that uses Github's Linguist to perform the 'skills' recognition
│
├── src/                                            # Source files
│   ├── app.js                                      # Main app setup
│   ├── components/                                 # What are effectively 'controllers', broken down by domain
│   ├── config.js                                   # Service configuration; where environment variables get pulled in
│   ├── index.js                                    # Main entrypoint to the API
│   ├── middleware/                                 # Express middleware
│   ├── scrapers/                                   # The different scraper classes
│   ├── scrapeTrainingData.js                       # Helper script used for scraping training data for the Contributors ML model
│   ├── utils/                                      # Other utilities for the API
│   └── workers/                                    # Setup code for the Redis workers
│
└── vendor/                                         # Third-party packages and stuff
    └── ruby-github-linguist_6.4.0-2_amd64.deb      # The deb packaged version of Github Linguist; can't use the 'gem' version cause it takes too long to install
```

# Interactions with Other Services

The following explains how the Scraper service interacts with the other Skillhub services.

## Backend

The Scraper (more specifically, the Scraper workers) call the Backend to pass it either the scraped issue data from Jira or the commit logs data from Bitbucket.

The Backend then processes the raw data or sends it off to the Predictions service for processing + predictions.

## Frontend

No interactions.

## Predictions

No interactions.

# Secrets

The following are the secrets stored in `service-secrets.zip` (or `.env.encrypted`). These are exposed to the service as environment variables.

- GIT_AUTH_TOKEN: A string of the form `BITBUCKET_USERNAME:BITBUCKET_PASSWORD` - used to authenticate to Bitbucket.
- JIRA_AUTH_TOKEN: A string of the form `JIRA_USERNAME:JIRA_PASSWORD` - used to authenticate to Jira.
- SKILLHUB_API_KEY: An arbitrary string used as an API key for the Backend service. Must match the Backend service's `SCRAPER_API_KEY`.

# Running the Scraper

The Scraper is currently setup to pull data from the CDH Studio accessible [Jira instance](https://jira.ised-isde.canada.ca).

In order to run the scraper locally, you'll need to have an account on the Jira instance.

Once you have your account, you'll need to create a `.env` file in `services/scraper`, with the following format:

```
JIRA_AUTH_TOKEN=jira_username:jira_password
```

Once the `.env` is created, running `make start` should bring up the scraper without any errors.

It runs on port `5001`.

**NOTE**: If there isn't a `.env` present for the scraper to pull Jira credentials from, it will throw an error when starting with `make start`. This is fine and can be ignored (assuming you don't need to test or develop the scraper).

# Using the Scraper

The Scraper has been setup so that it has one route that triggers all of its scraping activities: `/scraper`. You can hit this route locally with something like:

```
curl localhost:5001/scraper/contributors
```

To run the Scraper on a deployed branch or production, just change the host:

```
curl https://cdhsh-XX.scraper.skillhub.ca/scraper/contributors
```

This fully exposed, non-authenticated endpoint is merely to ease our development and testing processes.

In production, the scraper would most likely be running in-network, where it would have to be reconfigured to run the scraping process automatically when the container comes up.

In development, it makes more sense to have this be triggered manually for easier testing.
