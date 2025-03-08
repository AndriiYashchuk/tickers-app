FROM node:20-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY packages/common/package.json ./packages/common/
COPY packages/client/package.json ./packages/client/

RUN npm ci --omit=dev && npm cache clean --force

FROM base AS build

WORKDIR /app

COPY client/ ./client/
COPY packages/common ./packages/common/
COPY packages/client ./packages/client/

WORKDIR /app/client

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app/client

COPY --from=build /app/client/.next ./.next
COPY --from=build /app/client/public ./public
COPY --from=build /app/client/package.json ./
COPY --from=base /app/node_modules ./node_modules

CMD ["npm", "run", "start"]

FROM base AS development

WORKDIR /app

COPY client/ ./client/
COPY packages/common ./packages/common/
COPY packages/client ./packages/client/

WORKDIR /app/client

CMD ["npm", "run", "dev"]

# Default stage for building the development image it will be using for skaffold
FROM development AS default
