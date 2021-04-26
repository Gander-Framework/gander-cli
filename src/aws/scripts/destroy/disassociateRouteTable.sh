#!/bin/bash
aws ec2 disassociate-route-table \
--association-id $ASSOCIATION_ID