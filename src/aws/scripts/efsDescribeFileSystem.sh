#!/bin/bash

aws efs describe-file-systems \
--file-system-id $EFS_ID