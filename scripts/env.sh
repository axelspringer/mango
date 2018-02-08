#!/usr/bin/env bash

# because this script is being source-ed via .travis.yaml,
# we need to restore the original options so that that we don't interfere with
# travis' internals
readonly ORIGINAL_SHELL_OPTIONS=$(set +o)

# this script is extra noisy and used in many places during the build so we suppress the trace with +x to reduce the noise
set -u -e -o pipefail

# sets and optionally prints environmental variable
# usage: setEnvVar variableName variableValue
function  setEnvVar() {
  local name=$1
  local value=$2

  if [[ ${print} == "print" ]]; then
    echo ${name}=${value}
  fi
  export ${name}="${value}"
}

# use BASH_SOURCE so that we get the right path when this script is called AND source-d
readonly thisDir=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
readonly print=${1:-}

# print bash version just so that we know what is running all the scripts
if [[ ${print} == "print" ]]; then
  bash --version
fi


#######################
#    CUSTOM GLOBALS   #
#######################

setEnvVar PROJECT_ROOT $(cd ${thisDir}/../..; pwd)

#######################
# PREEXISTING GLOBALS #
#######################

setEnvVar LOGS_DIR /tmp/build/logs

CURRENT_SHELL_SOURCE_FILE=${BASH_SOURCE#${PROJECT_ROOT}/}
export CURRENT_SHELL_SOURCE_FILE=${CURRENT_SHELL_SOURCE_FILE#./}
# Prefix xtrace output with file name/line and optionally function name
# http://wiki.bash-hackers.org/scripting/debuggingtips#making_xtrace_more_useful
# TODO(i): I couldn't figure out how to set this via `setEnvVar` so I just set it manually
export PS4='+(${CURRENT_SHELL_SOURCE_FILE}:${LINENO}): ${FUNCNAME[0]:+${FUNCNAME[0]}(): }'
if [[ ${print} == "print" ]]; then
  echo PS4=${PS4}
fi

eval "${ORIGINAL_SHELL_OPTIONS}"
