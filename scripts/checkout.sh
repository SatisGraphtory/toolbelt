#!/usr/bin/env bash
set -e

REPOSITORY="${1}"
TARGET_REF="${2:-master}"

DESTINATION=./.${REPOSITORY}

if [[ -e .env ]]; then
  source .env
fi

if [[ ! -d "${DESTINATION}" ]]; then
  if [[ -z "${PUSH_TOKEN}" ]]; then
    git clone \
      https://github.com/SatisGraphtory/${REPOSITORY} \
      --quiet \
      --reference-if-able ../${REPOSITORY} \
      -n \
      "${DESTINATION}"
  else
    git clone \
      https://${PUSH_TOKEN}@github.com/SatisGraphtory/${REPOSITORY} \
      --quiet \
      --reference-if-able ../${REPOSITORY} \
      -n \
      "${DESTINATION}"
  fi
fi

cd "${DESTINATION}"
git fetch --quiet --tags --force --prune-tags origin
git checkout --quiet "${TARGET_REF}"
