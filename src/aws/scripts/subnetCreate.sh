#!/bin/bash

aws ec2 create-subnet \
--vpc-id $VPC_ID \
--tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value="'$SUBNET_NAME'"}]' \
--availability-zone $AVAIL_ZONE \
--cidr-block $SUBNET_CIDR_BLOCK

# getJsonValue ../responses/$SUBNET_NAME.json .Subnet.SubnetId SUBNET_ID