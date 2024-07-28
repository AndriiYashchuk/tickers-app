# Stage 1: creating base image
FROM node:16-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY mail/package.json ./mail/
COPY packages/common ./packages/common
COPY packages/server ./packages/server

RUN npm ci

# Stage 2: creating build image
FROM base AS build

COPY mail ./mail

WORKDIR /app/mail

RUN npm run build

# Stage 3: creating production image
FROM build AS production

WORKDIR /app

COPY --from=build /app/mail/dist ./mail/dist
COPY mail/package.json ./mail/

WORKDIR /app/mail

CMD ["npm", "run", "start:prod"]

# Stage 4: creating development image
FROM base AS development

WORKDIR /app

COPY mail ./mail

WORKDIR /app/mail

CMD ["npm", "run", "start:dev"]

# Default stage for building the development image it will be using for skaffold
FROM development AS default
