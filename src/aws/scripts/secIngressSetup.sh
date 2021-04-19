#!/bin/bash

# sudo apt-get install jq

# aws ec2 create-key-pair \
# --key-name $AWS_KEY_NAME \
# --query 'KeyMaterial' \
# --output text > ../privateKeys/$AWS_KEY_NAME.pem

# aws ec2 create-security-group \
# --group-name $EC2_SEC_GROUP_NAME \
# --description "$EC2_SEC_GROUP_DESC" \
# > ../responses/$EC2_SEC_GROUP_NAME.json

# getJsonValue ../responses/$EC2_SEC_GROUP_NAME.json .GroupId SEC_GROUP_ID

aws ec2 authorize-security-group-ingress \
--group-id $SEC_GROUP_ID \
--protocol tcp \
--port 80 \
--cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
--group-id $SEC_GROUP_ID \
--protocol tcp \
--port 443 \
--cidr 0.0.0.0/0

# aws ec2 authorize-security-group-ingress \
# --group-id $SEC_GROUP_ID \
# --protocol tcp \
# --port 22 \
# --cidr 0.0.0.0/0

# Old SEC_GROUP_ID retrieval, before getJsonValue() function
# SEC_GROUP_ID=$(jq .GroupId ../responses/$EC2_SEC_GROUP_NAME.json)
# # remove quotes from GROUP_ID
# SEC_GROUP_ID="${SEC_GROUP_ID%\"}"
# SEC_GROUP_ID="${SEC_GROUP_ID#\"}"
