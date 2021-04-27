aws cloudformation describe-stacks \
--stack-name fleet-apps \
--query "Stacks[?StackName=='$STACK_NAME'] | [0].Outputs"