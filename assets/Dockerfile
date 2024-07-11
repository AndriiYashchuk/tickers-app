# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app in the container
WORKDIR /app

# Copy the root package.json and package-lock.json if needed (optional based on your setup)
COPY package.json package-lock.json* ./

# Copy the necessary monorepo directories
COPY packages/common ./packages/common
COPY packages/server ./packages/server

COPY assets ./assets

# Navigate into the assets directory and install dependencies
RUN npm ci

# Copy the assets service source code
COPY assets/src ./src

# Copy the start script into the image
COPY assets/start.sh ./

WORKDIR /app/assets

RUN chmod +x start.sh

# Set environment variable from the build argument
ENV NODE_ENV=${NODE_ENV}

# Run the script when the container starts
CMD ["sh", "./start.sh"]
