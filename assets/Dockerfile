FROM node:alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
