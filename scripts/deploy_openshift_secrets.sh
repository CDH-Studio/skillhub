#!/bin/sh

oc create secret generic --from-env-file ./service-secrets/backend-secrets backend-secrets

oc create secret generic --from-env-file ./service-secrets/predictions-secrets predictions-secrets

oc create secret generic --from-env-file ./service-secrets/scraper-secrets scraper-secrets
