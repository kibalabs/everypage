#!/usr/bin/env bash
set -e -o pipefail

# NOTE(krishan711): when testing, use export AUTH_SECRET=dummysecret before start.sh
curl -X POST localhost:5000/v1/sites/generate -H 'content-type: application/json' -d '{"authSecret": "dummysecret", "siteName":"test", "buildHash":"testing123","siteHost":"abc.com","siteContent":{"keywords":[],"company":"Kiba Labs","companyUrl":"https://www.kibalabs.com","sections":[{"type":"hero-buttons-1","titleText":"This is such a cool site!","subtitleText":null,"buttons":[{"variant":"primary","target":"/","text":"Home"}],"logoImageUrl":null}]}, "siteTheme":{}}' --output site.zip
