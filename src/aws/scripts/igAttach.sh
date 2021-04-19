#!/bin/bash

aws ec2 attach-internet-gateway \
--internet-gateway-id $INTERNET_GATEWAY_ID \
--vpc-id $VPC_ID