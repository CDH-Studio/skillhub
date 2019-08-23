# Backend

The Backend service is the backbone of the entire application.

It is a Feathers.js-based REST API that handles everything relating to storing or retrieving persistent data.

Everything relating to the domain model is ultimately settled here in the Backend, since only the Backend has access to the Postgres database.

# Table of Contents

- [Tech Stack](#tech-stack)
- [Code Structure](#code-structure)
- [Interactions with Other Services](#interactions-with-other-services)
  * [Frontend](#frontend)
  * [Predictions](#predictions)
  * [Scraper](#scraper)
- [Secrets](#secrets)

# Tech Stack

- Language: JavaScript/Node
- API Framework: Express + Feathers.js
- ORM: Sequelize

# Code Structure

```
├── config/                             # Feathers configuration files
├── Dockerfile                          # Docker configuration
├── Makefile                            # Makefile with commands that are used by Kubails
├── package.json                        # Backend JavaScript dependencies
├── package-lock.json                   # Lock file for JavaScript dependencies
├── scripts/                            # Other useful scripts for the backend
│
└── src/                                # Source files
    ├── app.hooks.js                    # Top level app-scoped hooks
    ├── app.js                          # Main app setup
    ├── channels.js                     # A default Feathers file; not used
    ├── components/                     # The different domain services (e.g. 'transactions')
    ├── config.js                       # Service configuration; where environment variables get pulled in
    ├── db/                             # Database configuration and model schemas
    ├── externalServices/               # Classes wrapping external services into convenient interfaces
    ├── hooks/                          # Other feathers hooks
    ├── index.js                        # Main entrypoint to the API
    ├── middleware/                     # Node/Feathers middleware
    └── utils/                          # Other utilities for the API
```

# Interactions with Other Services

The following explains how the Backend service interacts with the other Skillhub services.

## Frontend

The Frontend calls the Backend for all manner of things (i.e. CRUD) relating to the data models.

It also relies on the Backend for JWT authentication.

The Frontend passes a JWT on all authenticated requests (i.e. pretty much everything except login/signup) to access restricted resources.

## Predictions

The Predictions service gets called by the Backend to perform predictions for contributors and skills (i.e. whether or not a person is a 'contributor' for a project, and whether or not a person has a skill).

The Predictions service then returns the predicted results and the Backend persists them.

## Scraper

The Scraper (more specifically, the Scraper workers) call the Backend to pass it either the scraped issue data from Jira or the commit logs data from Bitbucket.

The Backend then processes the raw data or sends it off to the Predictions service for processing + predictions.

# Secrets

The following are the secrets stored in `service-secrets.zip` (or `.env.encrypted`). These are exposed to the service as environment variables.

- PREDICTIONS_API_KEY: An arbitrary string used as an API key for the Predictions service. Must match the Predictions service's `SKILLHUB_API_KEY`.
- SCRAPER_API_KEY: An arbitrary string used as an API key for the Scraper service. Must match the Scraper service's `SKILLHUB_API_KEY`.
- TOKEN_SECRET: Secret used by Feathers for the JWT tokens.
