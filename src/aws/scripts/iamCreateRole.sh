aws iam create-role \
--role-name fleetTaskExecutionRole \
--assume-role-policy-document file://$TRUST_POLICY_PATH