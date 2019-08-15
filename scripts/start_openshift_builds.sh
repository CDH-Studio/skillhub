#!/bin/sh

oc start-build frontend
oc start-build backend
oc start-build predictions
oc start-build scraper
