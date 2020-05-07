FROM node:12.16.1-stretch as build

WORKDIR /app

# Install dependecies
COPY .npmrc .npmrc
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY packages/core/package.json packges/core/package.json
# COPY packages/core/package-lock.json packges/core/package-lock.json
COPY packages/main/package.json packges/main/package.json
# COPY packages/main/package-lock.json packges/main/package-lock.json
COPY packages/landing/package.json packges/landing/package.json
# COPY packages/landing/package-lock.json packges/landing/package-lock.json
COPY packages/canvas/package.json packges/canvas/package.json
COPY packages/canvas/package-lock.json packges/canvas/package-lock.json
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

RUN npm run bootstrap
RUN npm run build

# Canvas
FROM registry.gitlab.com/kibalabs/kiba/docker-images/app-serve:latest as canvas

COPY --from=build /app/packages/canvas/dist /usr/share/nginx/html

# Landing
FROM registry.gitlab.com/kibalabs/kiba/docker-images/app-serve:latest as landing

COPY --from=build /app/packages/landing/dist /usr/share/nginx/html
