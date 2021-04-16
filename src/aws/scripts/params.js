const params = {
  IAM_GROUP_NAME: 'Fleet-Practice-IAM-Group',
  IAM_USER_NAME: 'Fleet-Practice-IAM-User',

  AWS_KEY_NAME: 'Fleet-Practice-AWS-Key-Name',

  EC2_SEC_GROUP_NAME: 'Fleet-Practice-Security-Group',
  EC2_SEC_GROUP_DESC: 'IAM User Security Group',

  VPC_CIDR_BLOCK: '10.0.0.0/16',
  VPC_NAME: 'Fleet-Practice-VPC',

  SUBNET_NAME: 'Fleet-Practice-Subnet',
  SUBNET_CIDR_BLOCK: '10.0.0.0/24',
  AVAIL_ZONE: 'us-east-1a',

  INTERNET_GATEWAY_NAME: 'Fleet-Practice-IG',
  ROUTE_TABLE_NAME: 'Fleet-Practice-Route-Table',
  ROUTE_TABLE_ASSOCIATION: 'Fleet-Practice-Assoc',

  CLUSTER_NAME: 'Fleet-Practice-Cluster',
}

module.exports = params
