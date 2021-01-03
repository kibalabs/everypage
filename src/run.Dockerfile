FROM node:12.16.1-alpine

WORKDIR /app

COPY lerna.json .

RUN version=$(node --eval 'console.log(require("./lerna.json").version)') && npm install -g "@kibalabs/everypage-cli@${version}"
RUN npx everypage --version
