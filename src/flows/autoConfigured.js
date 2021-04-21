// eslint-disable-next-line unicorn/filename-case
const api = require('../aws/api')
const utils = require('../util')

const userConfigured = async (aws, generateIam) => {
  if (generateIam === 'yes') {
    const {awsIamResponse, iamError} = await api.setupIam(aws.iam)
    utils.display(awsIamResponse, iamError)
  }

  // create vpc
  const {awsVpcCreateResponse, vpcCreateError} = await api.createVpc(aws.vpc)
  utils.display(awsVpcCreateResponse, vpcCreateError)

  aws.vpc.id = JSON.parse(awsVpcCreateResponse).Vpc.VpcId

  // create security groups and rules
  const {awsSecGroupResponse, secGroupError} = await api.createSecurityGroup(aws.vpc.id, aws.clusterSecurityGroup)
  utils.display(awsSecGroupResponse, secGroupError)

  aws.clusterSecurityGroup.id = JSON.parse(awsSecGroupResponse).GroupId

  const {awsSGIngressResponse, SGIngressError} = await api.setSgIngress(aws.clusterSecurityGroup.id)
  utils.display(awsSGIngressResponse, SGIngressError)

  // create subnet
  const {awsSubnetCreateResponse, subnetCreateError} = await api.createSubnet(aws.vpc.id, aws.subnet)
  utils.display(awsSubnetCreateResponse, subnetCreateError)

  aws.subnet.id = JSON.parse(awsSubnetCreateResponse).Subnet.SubnetId

  // create internet gateway
  const {awsIgCreateResponse, igCreateError} = await api.createInternetGateway(aws.internetGateway)
  utils.display(awsIgCreateResponse, igCreateError)

  aws.internetGateway.id = JSON.parse(awsIgCreateResponse).InternetGateway.InternetGatewayId

  // attach internet gateway
  const {awsIgAttachResponse, igAttachError} = await api.attachInternetGateway(aws.internetGateway.id, aws.vpc.id)
  utils.display(awsIgAttachResponse, igAttachError)

  // create route table
  const {awsRouteTableCreateResponse, routeTableCreateError} = await api.createRouteTable(aws.vpc.id, aws.routeTable)
  utils.display(awsRouteTableCreateResponse, routeTableCreateError)

  aws.routeTable.id = JSON.parse(awsRouteTableCreateResponse).RouteTable.RouteTableId

  // create route
  const {awsRouteCreateResponse, routeCreateError} = api.createRoute(aws.routeTable.id, aws.internetGateway.id)
  utils.display(awsRouteCreateResponse, routeCreateError)

  // associate route table
  const {awsRouteTableAssociateResponse, routeTableAssociateError} = api.associateRouteTable(aws.routeTable.id, aws.subnet.id)
  utils.display(awsRouteTableAssociateResponse, routeTableAssociateError)

  // create EFS security group
  console.log('Now we will create a security group for your EFS')
  const efsAwsSecGroupResponse = await api.createSecurityGroup(aws.vpc.id, aws.efsSecurityGroup)
  console.log('efsAwsSecGroupResponse: ', efsAwsSecGroupResponse)

  aws.efsSecurityGroup.id = JSON.parse(efsAwsSecGroupResponse.awsSecGroupResponse).GroupId

  // authorize EFS security group to receive (ingress) traffic from VPC
  const {awsEfsSgIngressResponse, efsSgIngressError} = await api.setEfsSgIngress(aws.efsSecurityGroup.id, aws.clusterSecurityGroup.id)
  utils.display(awsEfsSgIngressResponse, efsSgIngressError)

  // authorize VPC security group to send out (egress) traffic to EFS
  const {awsEfsSgEgressResponse, efsSgEgressError} = await api.setEfsSgEgress(aws.efsSecurityGroup.id, aws.clusterSecurityGroup.id)
  utils.display(awsEfsSgEgressResponse, efsSgEgressError)

  // create EFS
  const {awsEfsCreateResponse, efsCreateError} = await api.createEfs(aws.efs.region, aws.efs)
  utils.display(awsEfsCreateResponse, efsCreateError)

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

    utils.display(awsEfsDescribeResponse, efsDescribeError)

    efsState = JSON.parse(awsEfsDescribeResponse).FileSystems[0].LifeCycleState
  }

  // create mount target in subnet
  const {awsMountTargetResponse, mountTargetError} = await api.createMountTarget(aws.efs.id, aws.subnet.id, aws.efsSecurityGroup.id)
  utils.display(awsMountTargetResponse, mountTargetError)

  aws.mountTarget.id = JSON.parse(awsMountTargetResponse).MountTargetId

  return aws
}

module.exports = userConfigured
