const {Command} = require('@oclif/command')
const api = require('../aws/api')
const prompts = require('../prompts')

const sleep = require('../util')

class SetupCommand extends Command {
  async run() {
    console.log('Welcome to Fleet-CLI! \n To help you get set up, please make sure you have your AWS credentials configured with the CLI. \n ')

    const iamResponse = await prompts.setupIam()

    if (iamResponse.iam === 'yes') {
      const {awsIamResponse, iamError} = await api.setupIam(iamResponse)
      console.log(awsIamResponse)
      console.log(iamError)
    }

    // create vpc
    const vpcCreateResponse = await prompts.createVpc()
    const {awsVpcCreateResponse, vpcCreateError} = await api.createVpc(vpcCreateResponse)
    console.log('awsVpcCreateResponse: ', awsVpcCreateResponse)
    console.log('vpcCreateError: ', vpcCreateError)

    const vpcId = JSON.parse(awsVpcCreateResponse).Vpc.VpcId

    // create security groups and rules
    const secGroupResponse = await prompts.createSecurityGroup()
    const {awsSecGroupResponse, secGroupError} = await api.createSecurityGroup(vpcId, secGroupResponse)
    console.log('awsSecGroupResponse: ', awsSecGroupResponse)
    console.log('secGroupError: ', secGroupError)

    const secGroupId = JSON.parse(awsSecGroupResponse).GroupId
    const {awsSGIngressResponse, SGIngressError} = await api.setSgIngress(secGroupId)
    console.log('awsSGIngressResponse: ', awsSGIngressResponse)
    console.log('SGIngressError: ', SGIngressError)

    // create subnet
    const subnetCreateResponse = await prompts.createSubnet()
    const {awsSubnetCreateResponse, subnetCreateError} = await api.createSubnet(vpcId, subnetCreateResponse)
    console.log('awsSubnetCreateResponse: ', awsSubnetCreateResponse)
    console.log('subnetCreateError: ', subnetCreateError)

    const subnetId = JSON.parse(awsSubnetCreateResponse).Subnet.SubnetId

    // create internet gateway
    const igCreateResponse = await prompts.createInternetGateway()
    const {awsIgCreateResponse, igCreateError} = await api.createInternetGateway(igCreateResponse)
    console.log('awsIgCreateResponse: ', awsIgCreateResponse)
    console.log('igCreateError: ', igCreateError)

    const igId = JSON.parse(awsIgCreateResponse).InternetGateway.InternetGatewayId

    // attach internet gateway
    const {awsIgAttachResponse, igAttachError} = await api.attachInternetGateway(igId, vpcId)
    console.log('awsIgAttachResponse: ', awsIgAttachResponse)
    console.log('igAttachError: ', igAttachError)

    // create route table
    const routeTableCreateResponse = await prompts.createRouteTable()
    const {awsRouteTableCreateResponse, routeTableCreateError} = await api.createRouteTable(vpcId, routeTableCreateResponse)
    console.log('awsRouteTableCreateResponse: ', awsRouteTableCreateResponse)
    console.log('routeTableCreateError: ', routeTableCreateError)

    const routeTableId = JSON.parse(awsRouteTableCreateResponse).RouteTable.RouteTableId

    // create route
    const {awsRouteCreateResponse, routeCreateError} = api.createRoute(routeTableId, igId)
    console.log('awsRouteCreateResponse: ', awsRouteCreateResponse)
    console.log('routeCreateError: ', routeCreateError)

    // associate route table
    const {awsRouteTableAssociateResponse, routeTableAssociateError} = api.associateRouteTable(routeTableId, subnetId)
    console.log('awsRouteTableAssociateResponse: ', awsRouteTableAssociateResponse)
    console.log('routeTableAssociateError: ', routeTableAssociateError)

    // ~~~ Security group stuff for EFS ~~~ //

    // create security group
    // Note: I'm adding this security group to the custom VPC we made
    console.log('Now we will create a security group for your EFS')
    const efsSecGroupResponse = await prompts.createSecurityGroup()
    const efsAwsSecGroupResponse = await api.createSecurityGroup(vpcId, efsSecGroupResponse)
    console.log('efsAwsSecGroupResponse: ', efsAwsSecGroupResponse)

    const efsSgId = JSON.parse(efsAwsSecGroupResponse.awsSecGroupResponse).GroupId

    // authorize EFS security group to receive (ingress) traffic from VPC
    const {awsEfsSgIngressResponse, efsSgIngressError} = await api.setEfsSgIngress(efsSgId, secGroupId)
    console.log('awsEfsSgIngressResponse :', awsEfsSgIngressResponse)
    console.log('efsSgIngressError :', efsSgIngressError)

    // authorize VPC security group to send out (egress) traffic to EFS
    const {awsEfsSgEgressResponse, efsSgEgressError} = await api.setEfsSgEgress(efsSgId, secGroupId)
    console.log('awsEfsSgEgressResponse :', awsEfsSgEgressResponse)
    console.log('efsSgEgressError :', efsSgEgressError)

    // create EFS
    const efsName = await prompts.createEfs()
    const {awsEfsCreateResponse, efsCreateError} = await api.createEfs(efsName)
    console.log('awsEfsCreateResponse :', awsEfsCreateResponse)
    console.log('efsCreateError :', efsCreateError)

    const efsId = JSON.parse(awsEfsCreateResponse).FileSystemId

    // Must wait until life cycle state of EFS is "available"
    let efsState = ''
    let awsEfsDescribeResponse
    let efsDescribeError

    while (efsState !== 'available' && !efsDescribeError) {
      sleep(500)

      // eslint-disable-next-line no-await-in-loop
      const response = await api.describeFileSystem(efsId)
      awsEfsDescribeResponse = response.awsEfsDescribeResponse
      efsDescribeError = response.efsDescribeError

      console.log('awsEfsDescribeResponse: ', awsEfsDescribeResponse)
      console.log('efsDescribeError: ', efsDescribeError)

      efsState = JSON.parse(awsEfsDescribeResponse).FileSystems[0].LifeCycleState
    }

    // create mount target in subnet -- make sure to add it to EFS security group
    // TODO: EFS DNS can't be resolved when we try to launch
    const {awsMountTargetResponse, mountTargetError} = await api.createMountTarget(efsId, subnetId, efsSgId)
    console.log('awsMountTargetResponse :', awsMountTargetResponse)
    console.log('mountTargetError :', mountTargetError)

    const mountTargetId = JSON.parse(awsMountTargetResponse).MountTargetId
  }
}

SetupCommand.description = 'Create an AWS VPC for your review apps to live'

module.exports = SetupCommand
