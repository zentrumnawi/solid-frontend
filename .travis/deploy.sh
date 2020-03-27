#!/bin/bash

# Command line arguments from Travis
TRAVIS_PR=${1}
TRAVIS_BRANCH=${2}

# Exit if this is a pull request
if [[ ${TRAVIS_PR} != "false" ]] || [[ ${TRAVIS_BRANCH} != "dev" && ${TRAVIS_BRANCH} != "master" && ${TRAVIS_BRANCH} != "preview" ]]; then
  echo "We do not deploy pull requests."
  exit 0
fi

# Perform the actual deploy
git stash --all
git checkout ${TRAVIS_BRANCH}
git push --force deploy ${TRAVIS_BRANCH}:master
