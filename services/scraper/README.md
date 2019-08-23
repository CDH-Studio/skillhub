# Scraper

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

## Using the Scraper

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
