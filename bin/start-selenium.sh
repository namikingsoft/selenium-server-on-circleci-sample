#!/bin/sh -eu

cd "${SELENIUM_DIRPATH}"
java -jar "${SELENIUM_SERVER_JARFILE}" &
