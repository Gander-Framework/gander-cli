aws cloudformation deploy \
  --stack-name $STACK_NAME \
  --template-file file://$TEMPLATE_PATH \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides UserAWSRegion=$REGION

