FROM node:12.16.1-stretch

WORKDIR /app

# Install dependecies
COPY .npmrc .
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

# Build app
RUN npm run build
