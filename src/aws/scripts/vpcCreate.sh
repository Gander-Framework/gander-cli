#!/bin/bash

aws ec2 create-vpc \
--cidr-block $VPC_CIDR_BLOCK \
--instance-tenancy default \
--tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value="'$VPC_NAME'"}]' 

# getJsonValue ../responses/$VPC_NAME.json .Vpc.VpcId VPC_ID

