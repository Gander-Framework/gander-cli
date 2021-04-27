#!/bin/bash

aws ec2 delete-subnet \
--subnet-id $CLUSTER_SUBNET_ID