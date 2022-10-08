#!/usr/bin/env bash

# This script uses the aws cli to update the code of an existing function imperatively

# In general using the sam cli is better, since it allows you to specify everything 
# that needs to be deployed in a declarative way.  

# Create zip file
cd ./publish
zip -r index.zip *

# Assume the function exists and just needs to be updated
# See README.md for CLI command to create the function  
aws lambda update-function-code \
  --function-name aws-sam-test \
  --zip-file "fileb://publish/index.zip"