#!/bin/bash

aws ec2 create-route-table \
--vpc-id $VPC_ID \
--tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value="'$ROUTE_TABLE_NAME'"}]'

# getJsonValue ../responses/$ROUTE_TABLE_NAME.json .RouteTable.RouteTableId ROUTE_TABLE_ID