FROM node:16-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY packages/common ./packages/common

RUN npm ci

FROM base AS build

COPY ./client ./client

WORKDIR /app/client

RUN npm run build

FROM build AS production

COPY --from=build /app/client/package.json ./client/
COPY --from=build /app/client/.next client/.next

WORKDIR /app/client

CMD ["npm", "run", "start"]

FROM base AS development

COPY --from=build /app/client ./client/

WORKDIR /app/client

CMD ["npm", "run", "dev"]

# Default stage for building the development image it will be using for skaffold
FROM development AS default
