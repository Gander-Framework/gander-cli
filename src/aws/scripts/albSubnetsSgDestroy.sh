#!/bin/bash

aws ec2 delete-subnet --subnet-id $ALB_SUBNETA_ID
aws ec2 delete-subnet --subnet-id $ALB_SUBNETB_ID

aws ec2 delete-security-group --group-id $ALB_SG_ID
