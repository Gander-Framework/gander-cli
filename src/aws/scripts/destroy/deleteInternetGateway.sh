#!/bin/bash
aws ec2 delete-internet-gateway \
--internet-gateway-id $INTERNET_GATEWAY_ID