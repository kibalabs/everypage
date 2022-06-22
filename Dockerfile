FROM node:18.4.0-bullseye as build

WORKDIR /app

# Install dependecies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

RUN npm ci
RUN npm run build
RUN npm run pack
RUN mv packages/cli/kibalabs-everypage-cli-*.tgz everypage-cli.tgz
RUN mv packages/core/kibalabs-everypage-*.tgz everypage.tgz

# Console
FROM ghcr.io/kibalabs/app-serve:latest as console
COPY --from=build /app/packages/console/dist /usr/share/nginx/html

# Builder API
FROM node:18.4.0-bullseye as builder-api

WORKDIR /app
COPY --from=build /app/everypage-cli.tgz .
COPY --from=build /app/everypage.tgz .
COPY ./packages/builder-api/package.json .
RUN npm install ./everypage-cli.tgz ./everypage.tgz
RUN npm install

COPY ./packages/builder-api/ ./
RUN npm run build

EXPOSE 5000
CMD ["./start.sh"]
