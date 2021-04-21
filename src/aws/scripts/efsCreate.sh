#!/bin/bash

aws efs create-file-system \
--tags 'Key=Name,Value="'$EFS_NAME'"' \
--region us-east-1 \
--creation-token fleet-apps-efs \
--encrypted