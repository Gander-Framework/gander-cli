#!/bin/bash
aws iam detach-role-policy --role-name $ROLE_NAME --policy-arn $POLICY_ARN