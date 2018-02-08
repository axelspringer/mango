#!/usr/bin/env bash

set -u -e -o pipefail

# Setup environment
readonly thisDir=$(cd $(dirname $0); pwd)
source ${thisDir}/_travis-fold.sh


# If the previous commands in the `script` section of .travis.yaml failed, then abort.
# The variable is not set in early stages of the build, so we default to 0 there.
# https://docs.travis-ci.com/user/environment-variables/
if [[ ${TRAVIS_TEST_RESULT=0} == 1 ]]; then
  exit 1;
fi


# Don't deploy if not running against axelspringer/mango
# TODO(i): because we don't let deploy to run outside of axelspringer/mango folks can't use their
#   private travis build to deploy anywhere. This is likely ok, but this means that @alexeagle's
#   fancy setup to publish ES2015 packages to github -build repos no longer works. This is ok
#   since with flat modules we'll have this feature built-in. We should still go and remove
#   stuff that Alex put in for this from publish-build-artifacts.sh
if [[ ${TRAVIS_REPO_SLUG} != "axelspringer/mango" ]]; then
  echo "Skipping deploy because this is not axelspringer/mango."
  exit 0
fi


case ${CI_MODE} in

  js)
    # Don't deploy if this is a PR build
    if [[ ${TRAVIS_PULL_REQUEST} != "false" ]]; then
      echo "Skipping deploy because this is a PR build."
      exit 0
    fi

    travisFoldStart "deploy.packages"
      # ${thisDir}/publish.sh
      # do not right now
    travisFoldEnd "deploy.packages"
    ;;
esac
