#!/bin/bash

aws elbv2 create-listener \
--load-balancer-arn $ALB_ARN \
--protocol HTTP \
--port 80 \
--default-actions '[{"Type": "fixed-response", "FixedResponseConfig": {"MessageBody": "There is no Fleet Review App here", "StatusCode": "404", "ContentType": "text/plain"}}]'