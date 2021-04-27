#!/bin/bash

aws elbv2 describe-load-balancers \
--load-balancer-arns $ALB_ARN