#!/bin/bash

aws ec2 authorize-security-group-egress \
--group-id $VPC_SEC_GROUP \
--ip-permissions IpProtocol=tcp,FromPort=2049,ToPort=2049,UserIdGroupPairs='{GroupId="'$EFS_SEC_GROUP'"}]'