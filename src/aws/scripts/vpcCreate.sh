#!/bin/bash

# sudo apt-get install jq

function getJsonValue()
{
  # requires jq to be installed
  # first arg: path/filename that holds the JSON object
  # second arg: field name (or "path") within the JSON object
  # third arg: variable name that will store the result value

  # store result variable name in a local variable
  local __resultvar=$3
  
  # grab the JSON value
  local jsonvalue=$(jq $2 $1)

  # remove quotes from retrieved JSON value
  jsonvalue="${jsonvalue%\"}"
  jsonvalue="${jsonvalue#\"}"
  
  eval $__resultvar="'$jsonvalue'"
}

aws ec2 create-vpc \
--cidr-block $VPC_CIDR_BLOCK \
--instance-tenancy default \
--tag-specifications 'ResourceType=vpc,Tags=[{Key=name,Value="'$VPC_NAME'"}]' \
> ../responses/$VPC_NAME.json

getJsonValue ../responses/$VPC_NAME.json .Vpc.VpcId VPC_ID

aws ec2 create-subnet \
--vpc-id $VPC_ID \
--tag-specifications 'ResourceType=subnet,Tags=[{Key=name,Value="'$SUBNET_NAME'"}]' \
--availability-zone $AVAIL_ZONE \
--cidr-block $SUBNET_CIDR_BLOCK \
> ../responses/$SUBNET_NAME.json

getJsonValue ../responses/$SUBNET_NAME.json .Subnet.SubnetId SUBNET_ID

aws ec2 create-internet-gateway \
--tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=name,Value="'$INTERNET_GATEWAY_NAME'"}]' \
> ../responses/$INTERNET_GATEWAY_NAME.json

getJsonValue ../responses/$INTERNET_GATEWAY_NAME.json .InternetGateway.InternetGatewayId INTERNET_GATEWAY_ID

aws ec2 attach-internet-gateway \
--internet-gateway-id $INTERNET_GATEWAY_ID \
--vpc-id $VPC_ID

aws ec2 create-route-table \
--vpc-id $VPC_ID \
--tag-specifications 'ResourceType=route-table,Tags=[{Key=name,Value=$ROUTE_TABLE_NAME}]' \
> ../responses/$ROUTE_TABLE_NAME.json

getJsonValue ../responses/$ROUTE_TABLE_NAME.json .RouteTable.RouteTableId ROUTE_TABLE_ID

# route outgoing internet traffic
aws ec2 create-route \
--route-table-id $ROUTE_TABLE_ID \
--gateway-id $INTERNET_GATEWAY_ID \
--destination-cidr-block 0.0.0.0/0

aws ec2 associate-route-table \
--route-table-id $ROUTE_TABLE_ID \
--subnet-id $SUBNET_ID \
> ../responses/$ROUTE_TABLE_ASSOCIATION.json

getJsonValue ../responses/$ROUTE_TABLE_ASSOCIATION.json .AssociationId ASSOCIATION_ID

# Old VPC_ID retrieval, before getJsonValue() function
#VPC_ID=$(jq .Vpc.VpcId ../responses/$VPC_NAME.json)
#remove quotes from VPC_ID
#VPC_ID="${VPC_ID%\"}"
#VPC_ID="${VPC_ID#\"}"