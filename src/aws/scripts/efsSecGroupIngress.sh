aws ec2 authorize-security-group-ingress \
--group-id $EFS_SEC_GROUP_ID \
--protocol tcp \
--port 2049 \
--source-group $VPC_SEC_GROUP_ID

