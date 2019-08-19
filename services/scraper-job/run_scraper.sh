#!/bin/sh

set -e

echo "Scraper host:"
echo "$SCRAPER_HOST"

curl https://$SCRAPER_HOST/scraper

echo "Successfully ran Scraper"
exit 0
