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

name="everypage-landing"
url="www.everypagehq.com"
dockerImageName="registry.gitlab.com/kibalabs/everypage/everypage-app/landing"
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
