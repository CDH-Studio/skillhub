# Backend

# Code Structure

```
└── backend                                 # The backend Node/Feathers API
    ├── config/                             # Feathers configuration files
    ├── Dockerfile                          # Docker configuration
    ├── Makefile                            # Makefile with commands that are used by Kubails
    ├── package.json                        # Backend JavaScript dependencies
    ├── scripts/                            # Other useful scripts for the backend
    │
    └── src/                                # Source files
        ├── app.hooks.js                    # Top level app-scoped hooks
        ├── app.js                          # Main app setup
        ├── components/                     # The different domain services (e.g. 'transactions')
        ├── db/                             # Database configuration and model schemas
        ├── hooks/                          # Other feathers hooks
        ├── index.js                        # Main entrypoint to the API
        ├── middleware/                     # Node/Feathers middleware
        └── utils/                          # Other utilities for the API
```
