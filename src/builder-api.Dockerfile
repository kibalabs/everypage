FROM node:12.16.1-stretch as builder-api

WORKDIR /app

COPY ./packages/builder-api/package.json .
RUN npm install

COPY ./packages/builder-api/ ./
RUN npm run build

EXPOSE 5000
CMD ["./start.sh"]
