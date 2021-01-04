#!/usr/bin/env bash
set -e -o pipefail

name="everypage-console"
url="console.everypagehq.com"
dockerImageName="docker.pkg.github.com/kibalabs/everypage/everypage-console"
dockerTag="latest"
dockerImage="${dockerImageName}:${dockerTag}"
version="$(git rev-list --count HEAD)"
varsFile=~/.${name}.vars

touch ${varsFile}
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
    --env-file ${varsFile} \
    ${dockerImage}

name="everypage-api-builder"
url="builder-api.everypagehq.com"
dockerImageName="docker.pkg.github.com/kibalabs/everypage/everypage-builder-api"
dockerTag="latest"
dockerImage="${dockerImageName}:${dockerTag}"
version="$(git rev-list --count HEAD)"
varsFile=~/.${name}.vars

touch ${varsFile}
docker pull ${dockerImage}
docker stop ${name} && docker rm ${name} || true
docker run \
    --name ${name} \
    --detach \
    --publish-all \
    --restart on-failure \
    --memory=768m \
    --cpus=$(echo "scale=2 ; $(grep -c ^processor /proc/cpuinfo) / 1.5" | bc) \
    --env NAME=$name \
    --env VERSION=$version \
    --env VIRTUAL_HOST=$url \
    --env LETSENCRYPT_HOST=$url \
    --env-file ${varsFile} \
    ${dockerImage}
