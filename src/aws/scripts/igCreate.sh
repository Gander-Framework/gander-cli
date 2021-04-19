#!/bin/bash

aws ec2 create-internet-gateway \
--tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=name,Value="'$INTERNET_GATEWAY_NAME'"}]'

# getJsonValue ../responses/$INTERNET_GATEWAY_NAME.json .InternetGateway.InternetGatewayId INTERNET_GATEWAY_ID