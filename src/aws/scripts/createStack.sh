aws cloudformation deploy \
  --stack-name $STACK_NAME \
  --template-file $TEMPLATE_PATH \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
  --parameter-overrides UserAWSRegion=$REGION \