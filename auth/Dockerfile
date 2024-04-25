# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app in the container
WORKDIR /app

# Copy the root package.json and package-lock.json if needed (optional based on your setup)
COPY package.json package-lock.json* ./

# Copy the necessary monorepo directories
COPY packages ./packages
COPY auth ./auth

RUN ls -la
RUN npm ci
# Navigate into the auth directory and install dependencies
WORKDIR /app/auth

# Copy the auth service source code
COPY auth/src ./src

# Set environment variable from the build argument
ENV NODE_ENV=${NODE_ENV}

# Run the script when the container starts
CMD ["npm", "start"]
