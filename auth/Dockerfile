# Use an official Node.js runtime as a parent image
FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
COPY auth/package.json ./auth/
COPY packages/common/ ./packages/common/
COPY packages/server/ ./packages/server/

RUN npm ci

COPY auth/src ./auth/src
COPY auth/tsconfig.json ./auth/tsconfig.json

# Navigate into the auth directory and install dependencies
WORKDIR /app/auth

# Run the script when the container starts
CMD ["npm", "start"]
