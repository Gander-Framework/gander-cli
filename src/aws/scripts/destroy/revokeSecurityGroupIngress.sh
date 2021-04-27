#!/bin/bash
aws ec2 revoke-security-group-ingress --group-id $RECEIVING_GROUP_ID \
--ip-permissions IpProtocol=tcp,FromPort=$PORT,ToPort=$PORT,UserIdGroupPairs='[{GroupId="'$SOURCE_GROUP_ID'"}]'