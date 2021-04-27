aws cloudformation deploy \
  --stack-name $STACK_NAME \
  --template-file file://$TEMPLATE_PATH \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides UserAWSRegion=$REGION

