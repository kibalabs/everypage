#!/usr/bin/env bash
set -e -o pipefail

name="everypage-canvas"
url="canvas.everypagehq.com"
dockerImageName="registry.gitlab.com/kibalabs/everypage/everypage-app/canvas"
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

name="everypage-console"
url="console.everypagehq.com"
dockerImageName="registry.gitlab.com/kibalabs/everypage/everypage-app/console"
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
dockerImageName="registry.gitlab.com/kibalabs/everypage/everypage-app/builder-api"
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
    --cpus=$(echo "scale=2 ; $(grep -c ^processor /proc/cpuinfo) / 1.5" | bc) \
    --env NAME=$name \
    --env VERSION=$version \
    --env VIRTUAL_HOST=$url \
    --env LETSENCRYPT_HOST=$url \
    --env-file ${varsFile} \
    ${dockerImage}
