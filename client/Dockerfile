FROM node:16-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

FROM base AS build

COPY client/package.json ./client/
RUN npm ci

COPY client ./client

WORKDIR /app/client

RUN npm run build

FROM build AS production

COPY --from=build /app/client/.next ./.next

CMD ["npm", "run", "start"]

FROM base AS development

COPY client/package.json client/package-lock.json ./client/
RUN npm ci

WORKDIR /app/client

CMD ["npm", "run", "dev"]

# Default stage for building the development image it will be using for skaffold
FROM development AS default
