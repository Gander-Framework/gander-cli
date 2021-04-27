#!/bin/bash
aws ec2 revoke-security-group-egress --group-id $SOURCE_GROUP_ID \
--ip-permissions IpProtocol=tcp,FromPort=$PORT,ToPort=$PORT,UserIdGroupPairs='[{GroupId="'$DEST_GROUP_ID'"}]'