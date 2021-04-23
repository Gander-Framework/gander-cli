#!/bin/bash

aws ec2 associate-route-table \
--route-table-id $ROUTE_TABLE_ID \
--subnet-id $SUBNET_ID

# getJsonValue ../responses/$ROUTE_TABLE_ASSOCIATION.json .AssociationId ASSOCIATION_ID