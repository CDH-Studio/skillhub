# Frontend

The Frontend service is the client facing portion of the application.

It is a React-based single page application (SPA) that gives the user the interface to interact with all of the profiles, projects, and skills.

The Frontend is probably the most complicated part of the application, since it incorporates a number of advanced libraries and concepts from the React ecosystem (not to mention just generally being full of tech debt).

# Tech Stack

- Languages: JavaScript + Sass
- UI Framework: React + Redux + Redux Saga
- UI Library: Material-UI

# Code Structure

```
├── Dockerfile                          # Docker configuration
├── jsconfig.json                       # create-react-app configuration to enable absolute imports
├── Makefile                            # Makefile with commands that are used by Kubails
├── package.json                        # Frontend JavaScript dependencies
├── package-lock.json                   # Lock file for JavaScript dependencies
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

# Interactions with Other Services

The following explains how the Frontend service interacts with the other Skillhub services.

## Backend

The Frontend calls the Backend for all manner of things (i.e. CRUD) relating to the data models.

It also relies on the Backend for JWT authentication.

## Predictions

No interactions.

## Scraper

No interactions.

# Secrets

The Frontend has no secrets (for obvious reasons).

# A Note on Environment Variables

The Frontend is setup to be served by a Node/Express server from the Dockerfile. This means that, instead of building the Frontend into a set of static files and then serving those using a CDN, the Frontend is instead built into a set of static files and served straight from a web server.

The reason we do this is so that we can inject environment variables that we otherwise couldn't into the Frontend (remember, the Frontend runs in a browser; there are no environment variables there). This is so that we can, for example, dynamically set the URL for the Backend service.

## How it Works

What we do is set environment variables on the Frontend container like normal; the Express server can read these. 

Then, when the Express server goes to serve a user the static bundle, it injects (through string find/replace) certain environment variables into the `index.html`.

This logic can be found in `server/app.js`.
