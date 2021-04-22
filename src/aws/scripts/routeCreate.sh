#!/bin/bash

# route outgoing internet traffic
aws ec2 create-route \
--route-table-id $ROUTE_TABLE_ID \
--gateway-id $INTERNET_GATEWAY_ID \
--destination-cidr-block 0.0.0.0/0