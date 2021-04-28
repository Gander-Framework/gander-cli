#!/bin/bash
aws cloudformation delete-stack --stack-name $STACK_NAME

aws cloudformation wait stack-delete-complete \
--stack-name $STACK_NAME