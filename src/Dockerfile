FROM node:12.16.1-stretch as build

WORKDIR /app

# Install dependecies
COPY .npmrc .npmrc
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY packages/kiba-build/package.json packges/kiba-build/package.json
COPY packages/kiba-build/package-lock.json packges/kiba-build/package-lock.json
COPY packages/core/package.json packges/core/package.json
# COPY packages/core/package-lock.json packges/core/package-lock.json
COPY packages/main/package.json packges/main/package.json
# COPY packages/main/package-lock.json packges/main/package-lock.json
COPY packages/landing/package.json packges/landing/package.json
# COPY packages/landing/package-lock.json packges/landing/package-lock.json
COPY packages/canvas/package.json packges/canvas/package.json
# COPY packages/canvas/package-lock.json packges/canvas/package-lock.json
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci

COPY . .

RUN npm run bootstrap
RUN npm run build

# Canvas
FROM nginx:1.17.9 as canvas

WORKDIR /app

COPY --from=build /app/packages/canvas/dist /usr/share/nginx/html
COPY --from=build /app/packages/canvas/nginx.conf.template .
COPY --from=build /app/packages/canvas/start.sh .

EXPOSE 80
CMD ["./start.sh"]

# Landing
FROM nginx:1.17.9 as landing

WORKDIR /app

COPY --from=build /app/packages/landing/dist /usr/share/nginx/html
COPY --from=build /app/packages/landing/nginx.conf.template .
COPY --from=build /app/packages/landing/start.sh .

EXPOSE 80
CMD ["./start.sh"]

# Landing
FROM node:12.16.1-alpine as run

WORKDIR /app

COPY --from=build /app/packages/main/ _ep/
RUN npm install -g _ep/
RUN npx everypage --version
