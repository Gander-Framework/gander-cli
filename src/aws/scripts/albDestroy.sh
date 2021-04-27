#!/bin/bash

aws elbv2 delete-listener --listener-arn $ALB_LISTENER_ARN

aws elbv2 delete-load-balancer --load-balancer-arn $ALB_LB_ARN
