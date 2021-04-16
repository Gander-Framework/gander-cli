#!/bin/bash

aws iam create-group --group-name $IAM_GROUP_NAME
aws iam create-user --user-name $IAM_USER_NAME

aws iam add-user-to-group \
--user-name $IAM_USER_NAME \
--group-name $IAM_GROUP_NAME
