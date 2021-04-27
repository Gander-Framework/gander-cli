#!/bin/bash

aws elbv2 describe-load-balancers \
--query "LoadBalancers[?LoadBalancerArn=='$ALB_LB_ARN'].LoadBalancerName" \
--output text