#!/bin/bash

aws elbv2 delete-listener --listener-arn $ALB_LISTENER_ARN

aws elbv2 delete-load-balancer --load-balancer-arn $ALB_LB_ARN

aws ec2 delete-subnet --subnet-id $ALB_SUBNETA_ID
aws ec2 delete-subnet --subnet-id $ALB_SUBNETB_ID

aws ec2 delete-security-group --group-id $ALB_SG_ID
