#!/bin/bash

aws ec2 disassociate-route-table \
--association-id $ASSOCIATION_ID

# must first dissociate
aws ec2 delete-route-table \
--route-table-id $ROUTE_TABLE_ID

aws ec2 detach-internet-gateway \
--internet-gateway-id $INTERNET_GATEWAY_ID \
--vpc-id $VPC_ID

# must first detatch
aws ec2 delete-internet-gateway \
--internet-gateway-id $INTERNET_GATEWAY_ID

# must first terminate all running instances in the subnet
aws ec2 delete-subnet \
--subnet-id $SUBNET_ID

# must first detach or delete all associated gateways and resources
aws ec2 delete-vpc --vpc-id $VPC_ID

aws ec2 delete-security-group \
--group-id $SEC_GROUP_ID

aws ec2 describe-key-pairs > ../privateKeys/all_key_pairs.json

KEYPAIR_ID_TO_DELETE=$(jq \
'.KeyPairs[] | select(.KeyName == "'$AWS_KEY_NAME'") | .KeyPairId' \
../privateKeys/all_key_pairs.json)

KEYPAIR_ID_TO_DELETE="${KEYPAIR_ID_TO_DELETE%\"}"
KEYPAIR_ID_TO_DELETE="${KEYPAIR_ID_TO_DELETE#\"}"
aws ec2 delete-key-pair --key-pair-id $KEYPAIR_ID_TO_DELETE