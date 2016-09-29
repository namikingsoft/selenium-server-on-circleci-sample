#!/bin/sh -eu

mkdir -p "${SELENIUM_DIRPATH}"
cd "${SELENIUM_DIRPATH}"

if [ ! -e "${SELENIUM_SERVER_JARFILE}" ]; then
  curl -Lo \
    "${SELENIUM_SERVER_JARFILE}" \
    "https://selenium-release.storage.googleapis.com/3.0-beta3/selenium-server-standalone-3.0.0-beta3.jar"
fi

java -jar "${SELENIUM_SERVER_JARFILE}" &
