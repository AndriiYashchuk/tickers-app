# Stage 1: creating base image
FROM node:16-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/common ./packages/common
COPY packages/server ./packages/server

RUN npm ci

# Stage 2: creating build image
FROM base AS build

COPY assets/package.json ./assets/
RUN npm ci

COPY assets ./assets

WORKDIR /app/assets

RUN npm run build

# Stage 3: creating production image
FROM build AS production

WORKDIR /app

# Копируем только необходимые файлы для production
COPY --from=build /app/assets/dist ./assets/dist
COPY assets/package.json ./assets/

RUN npm ci --only=production

WORKDIR /app/assets

CMD ["npm", "run", "start:prod"]

# Stage 4: creating development image
FROM base AS development

WORKDIR /app

COPY assets/package.json ./assets/
RUN npm ci

COPY assets ./assets

WORKDIR /app/assets

CMD ["npm", "run", "start:dev"]

# Default stage for building the development image it will be using for skaffold
FROM development AS default
