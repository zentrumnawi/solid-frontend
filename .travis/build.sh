#!/bin/bash

TRAVIS_BRANCH=${1}

if [[ ${TRAVIS_BRANCH} == "master" ]]; then
    yarn build:prod
    exit 0
fi

yarn build:staging
