#!/bin/bash

aws efs create-file-system \
--tags 'Key=Name,Value="'$EFS_NAME'"' \
--region $REGION \
--creation-token $CREATION_TOKEN \
--encrypted