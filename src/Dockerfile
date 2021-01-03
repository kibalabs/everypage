FROM node:12.16.1-stretch as build

WORKDIR /app

# Install dependecies
COPY lerna.json lerna.json
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY packages/core/package.json packges/core/package.json
COPY packages/console/package.json packges/console/package.json
COPY packages/cli/package.json packges/cli/package.json
COPY packages/test/package.json packges/test/package.json
COPY packages/builder-api/package.json packges/builder-api/package.json
RUN npm ci

COPY . .

RUN npm run bootstrap-ci
RUN npm run build

# Console
FROM nginx:1.17.10 as console

WORKDIR /app
COPY packages/console/nginx.conf .
COPY packages/console/start.sh .
COPY --from=build /app/packages/console/dist /usr/share/nginx/html

EXPOSE 80
CMD ["./start.sh"]
