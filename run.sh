#!/usr/bin/env bash
set -e -o pipefail

name="everypage-console"
url="console.everypagehq.com"
dockerImageName="ghcr.io/kibalabs/everypage-console"
dockerTag="latest"
dockerImage="${dockerImageName}:${dockerTag}"
version="$(git rev-list --count HEAD)"

docker pull ${dockerImage}
docker stop ${name} && docker rm ${name} || true
docker run \
    --name ${name} \
    --detach \
    --publish-all \
    --restart on-failure \
    --env NAME=$name \
    --env VERSION=$version \
    --env VIRTUAL_HOST=$url \
    --env LETSENCRYPT_HOST=$url \
    --env-file ~/.${name}.vars \
    ${dockerImage}

name="everypage-api-builder"
network="everypage-network"
dockerImageName="ghcr.io/kibalabs/everypage-builder-api"
dockerTag="latest"
dockerImage="${dockerImageName}:${dockerTag}"
version="$(git rev-list --count HEAD)"

docker pull ${dockerImage}
docker stop ${name} && docker rm ${name} || true
docker network create ${network} || true
docker run \
    --name ${name} \
    --detach \
    --publish-all \
    --restart on-failure \
    --memory=768m \
    --cpus=$(echo "scale=2 ; $(grep -c ^processor /proc/cpuinfo) / 1.5" | bc) \
    --net=${network}
    --env NAME=$name \
    --env VERSION=$version \
    --env-file ~/.${name}.vars \
    ${dockerImage}
