#!/bin/bash

aws elbv2 create-load-balancer \
--name $ALB_NAME \
--security-groups $ALB_SEC_GROUP_ID \
--subnets $SUBNETA_ID $SUBNETB_ID  