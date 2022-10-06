#!/usr/bin/env bash

# Assume the function exists and just needs to be updated
# See README.md for CLI command to create the function  
aws lambda update-function-code \
  --function-name aws-sam-test \
  --zip-file "fileb://publish/index.zip"