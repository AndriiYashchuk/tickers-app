#!/bin/bash
# start.sh

# Default to 'prod' if not set
ENVIRONMENT=${NODE_ENV:-development}

if [ "$ENVIRONMENT" = "production" ]; then
  npm run start:prod
else
  npm run start:dev
fi
