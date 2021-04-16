#!/bin/bash

IAM_GROUP_NAME=Fleet-Practice-IAM-Group-$1
IAM_USER_NAME=Fleet-Practice-IAM-User-$1

AWS_KEY_NAME=Fleet-Practice-AWS-Key-Name-$1

EC2_SEC_GROUP_NAME=Fleet-Practice-Security-Group-$1
EC2_SEC_GROUP_DESC="IAM User Security Group"


VPC_CIDR_BLOCK=10.0.0.0/16
VPC_NAME=Fleet-Practice-VPC-$1

SUBNET_NAME=Fleet-Practice-Subnet-$1
SUBNET_CIDR_BLOCK=10.0.0.0/24
AVAIL_ZONE=us-east-2a

INTERNET_GATEWAY_NAME=Fleet-Practice-IG-$1
ROUTE_TABLE_NAME=Fleet-Practice-Route-Table-$1
ROUTE_TABLE_ASSOCIATION=Fleet-Practice-Assoc-$1

CLUSTER_NAME=Fleet-Practice-Cluster-$1
