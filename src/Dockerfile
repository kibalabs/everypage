FROM node:12.16.1-stretch as build

WORKDIR /app

# Install dependecies
COPY .npmrc .npmrc
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY packages/react-core/package.json packges/react-core/package.json
# COPY packages/react-core/package-lock.json packges/react-core/package-lock.json
COPY packages/ts-core/package.json packges/ts-core/package.json
# COPY packages/ts-core/package-lock.json packges/ts-core/package-lock.json
COPY packages/core/package.json packges/core/package.json
# COPY packages/core/package-lock.json packges/core/package-lock.json
COPY packages/main/package.json packges/main/package.json
# COPY packages/main/package-lock.json packges/main/package-lock.json
COPY packages/test/package.json packges/test/package.json
# COPY packages/test/package-lock.json packges/test/package-lock.json
COPY packages/builder-api/package.json packges/builder-api/package.json
# COPY packages/builder-api/package-lock.json packges/builder-api/package-lock.json
COPY packages/console/package.json packges/console/package.json
# COPY packages/console/package-lock.json packges/console/package-lock.json
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

RUN npm run bootstrap
RUN npm run build

# Console
FROM registry.gitlab.com/kibalabs/kiba/docker-images/app-serve:latest as console
COPY --from=build /app/packages/console/dist /usr/share/nginx/html
