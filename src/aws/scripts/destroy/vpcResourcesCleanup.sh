#!/bin/bash

# must first terminate all running instances in the subnet
aws ec2 delete-subnet \
--subnet-id $CLUSTER_SUBNET_ID

aws ec2 delete-security-group --group-id $CLUSTER_SECURITY_GROUP

aws ec2 delete-security-group --group-id $EFS_SECURITY_GROUP
