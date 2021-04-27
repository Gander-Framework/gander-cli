#!/bin/bash

aws ec2 delete-route-table \
--route-table-id $ROUTE_TABLE_ID