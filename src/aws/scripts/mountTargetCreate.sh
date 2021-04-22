aws efs create-mount-target \
--file-system-id $EFS_ID \
--subnet-id $SUBNET_ID \
--security-groups $EFS_SG_ID