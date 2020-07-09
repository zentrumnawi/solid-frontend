#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

PARENT_DIR="$PWD"
ROOT_DIR="."
LIBS=("solid/core" "solid/glossary" "solid/profile" "solid/quiz" "solid/skeleton" "solid/slideshow")
VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

for lib in "${LIBS[@]}"
do
  echo "Publishing $lib to github packages"
  yarn publish --new-version $VERSION --no-git-tag-version dist/libs/$lib
done
