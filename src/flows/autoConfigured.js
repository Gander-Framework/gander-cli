// eslint-disable-next-line unicorn/filename-case
const api = require('../aws/api')
const utils = require('../util')

const autoConfigured = async (aws, generateIam) => {
  if (generateIam === 'yes') {
    const {awsIamResponse, iamError} = await api.setupIam(aws.iam)
    utils.display(awsIamResponse, iamError)
  }
  console.log('In autoconfigured')

  // create vpc
  const {awsVpcCreateResponse, vpcCreateError} = await api.createVpc(aws.vpc)

  aws.vpc.id = JSON.parse(awsVpcCreateResponse).Vpc.VpcId

  // create security groups and rules
  const {awsSecGroupResponse, secGroupError} = await api.createSecurityGroup(aws.vpc.id, aws.clusterSecurityGroup)

  aws.clusterSecurityGroup.id = JSON.parse(awsSecGroupResponse).GroupId

  const {awsSGIngressResponse, SGIngressError} = await api.setSgIngress(aws.clusterSecurityGroup.id)

  // create subnet
  const {awsSubnetCreateResponse, subnetCreateError} = await api.createSubnet(aws.vpc.id, aws.subnet)

  aws.subnet.id = JSON.parse(awsSubnetCreateResponse).Subnet.SubnetId

  const {awsSubnetModifyResponse, subnetModifyError} = api.modifySubnetAttribute(aws.subnet.id)
  utils.display(awsSubnetModifyResponse, subnetModifyError)
  
  // create internet gateway
  const {awsIgCreateResponse, igCreateError} = await api.createInternetGateway(aws.internetGateway)

  aws.internetGateway.id = JSON.parse(awsIgCreateResponse).InternetGateway.InternetGatewayId

  // attach internet gateway
  const {awsIgAttachResponse, igAttachError} = await api.attachInternetGateway(aws.internetGateway.id, aws.vpc.id)

  // create route table
  const {awsRouteTableCreateResponse, routeTableCreateError} = await api.createRouteTable(aws.vpc.id, aws.routeTable)

  aws.routeTable.id = JSON.parse(awsRouteTableCreateResponse).RouteTable.RouteTableId

  // create route
  const {awsRouteCreateResponse, routeCreateError} = api.createRoute(aws.routeTable.id, aws.internetGateway.id)

  // associate route table
  const {awsRouteTableAssociateResponse, routeTableAssociateError} = api.associateRouteTable(aws.routeTable.id, aws.subnet.id)

  // create EFS security group
  console.log('Now we will create a security group for your EFS')
  const efsAwsSecGroupResponse = await api.createSecurityGroup(aws.vpc.id, aws.efsSecurityGroup)

  aws.efsSecurityGroup.id = JSON.parse(efsAwsSecGroupResponse.awsSecGroupResponse).GroupId

  // authorize EFS security group to receive (ingress) traffic from VPC
  const {awsEfsSgIngressResponse, efsSgIngressError} = await api.setEfsSgIngress(aws.efsSecurityGroup.id, aws.clusterSecurityGroup.id)

  // authorize VPC security group to send out (egress) traffic to EFS
  const {awsEfsSgEgressResponse, efsSgEgressError} = await api.setEfsSgEgress(aws.efsSecurityGroup.id, aws.clusterSecurityGroup.id)

  // create EFS
  const {awsEfsCreateResponse, efsCreateError} = await api.createEfs(aws.efs.region, aws.efs)

  aws.efs.id = JSON.parse(awsEfsCreateResponse).FileSystemId

  // Must wait until life cycle state of EFS is "available" before creating mount target
  let efsState = ''
  let awsEfsDescribeResponse
  let efsDescribeError

  while (efsState !== 'available' && !efsDescribeError) {
    utils.sleep(500)

    // eslint-disable-next-line no-await-in-loop
    const response = await api.describeFileSystem(aws.efs.id)
    awsEfsDescribeResponse = response.awsEfsDescribeResponse
    efsDescribeError = response.efsDescribeError

    efsState = JSON.parse(awsEfsDescribeResponse).FileSystems[0].LifeCycleState
  }

  // create mount target in subnet
  const {awsMountTargetResponse, mountTargetError} = await api.createMountTarget(aws.efs.id, aws.subnet.id, aws.efsSecurityGroup.id)

  aws.mountTarget.id = JSON.parse(awsMountTargetResponse).MountTargetId
  
  return aws
}

module.exports = autoConfigured
