# Этап 1: Сборка общих зависимостей и модулей
FROM node:16-alpine AS base

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY packages/common ./packages/common
COPY packages/server ./packages/server

RUN npm ci

# Этап 2: Сборка для производства
FROM base AS build

COPY mail ./mail

WORKDIR /app/mail

RUN npm run build

# Этап 3: Создание производственного образа
FROM node:16-alpine AS production

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY packages/common ./packages/common
COPY packages/server ./packages/server
COPY --from=build /app/mail/dist ./mail/dist
COPY mail/package.json ./mail/

RUN npm ci --only=production

WORKDIR /app/mail


CMD ["npm", "run", "start:prod"]

# Этап 4: Создание образа для разработки
FROM base AS development

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY packages/common ./packages/common
COPY packages/server ./packages/server
COPY mail/package.json ./mail/

RUN npm ci

RUN ls -a node_modules/

COPY mail ./mail


WORKDIR /app/mail

CMD ["npm", "run", "start:dev"]

# Default stage for building the development image it will be using for skaffold
FROM development AS default
