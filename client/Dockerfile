FROM node:20-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json ./client/
COPY packages/common ./packages/common
COPY packages/client ./packages/client

RUN npm ci

FROM base AS build

COPY client/tsconfig.json client/next.config.js client/postcss.config.js client/tailwind.config.ts ./client/
COPY client/src ./client/src
COPY client/public ./client/public
COPY client/api ./client/api
COPY client/declared-types ./client/declared-types
COPY .eslintrc.json ./

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
