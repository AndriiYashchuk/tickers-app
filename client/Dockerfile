FROM node:16-alpine AS base

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

FROM base AS build
COPY . .

RUN npm run build

FROM build AS production

COPY --from=build /app/.next ./.next

CMD ["npm", "run", "start"]

FROM base AS development

COPY --from=build /app/.next ./.next

CMD ["npm", "run", "start"]

# Default stage for building the development image it will be using for skaffold
FROM development AS default
