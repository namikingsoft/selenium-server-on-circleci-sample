#!/bin/sh -eu

export SELENIUM_DIRPATH="./selenium"
export SELENIUM_SERVER_JARFILE="selenium-server-standalone-3.0.0-beta3.jar"

./bin/install-selenium.sh
./bin/copy-driver.sh
./bin/start-selenium.sh
