# Frontend

# Code Structure

```
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


