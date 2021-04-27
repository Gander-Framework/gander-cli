#!/bin/bash
# requires jq to be installed
# first arg: path/filename that holds the JSON object
# second arg: field name (or "path") within the JSON object
# third arg: variable name that will store the result value

function getJSONValue()
{
  # store result variable name in a local variable
  local __resultvar=$3
  
  # grab the JSON value
  local jsonvalue=$(jq $2 $1)

  # remove quotes from retrieved JSON value
  jsonvalue="${jsonvalue%\"}"
  jsonvalue="${jsonvalue#\"}"
  
  eval $__resultvar="'$jsonvalue'"
}