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
--subnet-id $CLUSTER_SUBNET_ID

aws ec2 delete-security-group --group-id $CLUSTER_SECURITY_GROUP

aws ec2 delete-security-group --group-id $EFS_SECURITY_GROUP
